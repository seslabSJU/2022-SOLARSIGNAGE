import requests

bus_addr = '<bus_shelter_address>'

host = '<om2m_server_address>'
port = '8080'

ae_name = 'bus_shelter'
headers = {
    'X-M2M-Origin': '<om2m-id>:<om2m-passwd>',
    'Content-Type': '',
    'Cache-Control': 'no-cache',
}
containers = ['led1', 'led2', 'awning']

def init_script():
    # create ae
    headers['Content-Type'] = 'application/json;ty=2'
    data = {
        'm2m:ae': {
            'api': 'bus-shelter',
            'rn': ae_name,
            'lbl' : [],
            'rr': True
        }
    }
    res = requests.post(f'http://{host}:{port}/~/in-cse', json=data, headers=headers)
    print('[CREATE AE]', res.status_code)

    if res.status_code != 201:
        return 0
    ae_addr = res.json()['m2m:ae']['ri']

    for container in containers:
        # create container
        headers['Content-Type'] = 'application/json;ty=3'
        data = {
            'm2m:cnt': {
                'rn': container
            }
        }
        res = requests.post(f'http://{host}:{port}/~{ae_addr}', json=data, headers=headers)
        print(f'[CREATE {container} CONTAINER]', res.status_code)

        if res.status_code != 201:
            return ae_addr
        cnt_addr = res.json()['m2m:cnt']['ri']
        
        # create content instance
        headers['Content-Type'] = 'application/json;ty=4'
        data = {
            'm2m:cin': {
                'cnf': f'{container}-status',
                'con': 0
            }
        }
        res = requests.post(f'http://{host}:{port}/~{cnt_addr}', json=data, headers=headers)
        print(f'[CREATE {container} CONTENT INSTANCE]', res.status_code)
        if res.status_code != 201:
            return ae_addr

        # create subscription
        headers['Content-Type'] = 'application/json;ty=23'
        data = {
            'm2m:sub': {
                'rn': f'{container}-sub',
                'nu': [f'http://{bus_addr}:3002/{container}'],
                'nct': 2
            }
        }
        res = requests.post(f'http://{host}:{port}/~{cnt_addr}', json=data, headers=headers)
        print(f'[CREATE {container} SUBSCRIPTION]', res.status_code)
        if res.status_code != 201:
            return 

    print('Successfully initialize OM2M server')

if __name__ == "__main__":
    ret = init_script()

    if ret is not 0:
        requests.delete(f'http://{host}:{port}/~{ret}', headers={'X-M2M-Origin': 'admin:admin', 'Cache-Control': 'no-cache'})