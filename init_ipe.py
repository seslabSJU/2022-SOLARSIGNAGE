import sys
import requests

modbus_addr = '<modbus_address>'
wrapper_addr = '<solar_wrapper_address>'

host = '<om2m_server_address>'
port = '8080'

headers = {
    'X-M2M-Origin': '<om2m-id>:<om2m-passwd>',
    'Content-Type': '',
    'Cache-Control': 'no-cache',
}

def create_ae(api, rn):
    # create Modbus IPE AE
    headers['Content-Type'] = 'application/json;ty=2'
    data = {
        'm2m:ae': {
            'api': api,
            'rn': rn,
            'lbl': [],
            'rr': True
        }
    }
    res = requests.post(f'http://{host}:{port}/~/in-cse', json=data, headers=headers)
    print('[CREATE AE]', res.status_code)

    if res.status_code != 201:
        sys.exit('AE creation is failed.')

def create_fcnt(ae_name, fcnt_name, data):
    headers['Content-Type'] = 'application/json;ty=28'
    res = requests.post(f'http://{host}:{port}/~/in-cse/in-name/{ae_name}', json=data, headers=headers)
    print(f'[CREATE {fcnt_name} FLEXCONTAINER]', res.status_code)

    if res.status_code != 201:
        sys.exit(f'{fcnt_name} flexcontainer creation is failed.')

def create_sub(ae_name, fcnt_name, rn, nu):
    headers['Content-Type'] = 'application/json;ty=23'
    data = {
        'm2m:sub': {
            'rn': rn,
            'nu': [nu],
            'nct': 2
        }
    }
    res = requests.post(f'http://{host}:{port}/~/in-cse/in-name/{ae_name}/{fcnt_name}', json=data, headers=headers)
    print(f'[CREATE {fcnt_name} SUBSCRIPTION]', res.status_code)

    if res.status_code != 201:
        sys.exit(f'{fcnt_name} subscription creation is failed.')

def create_ipe_fcnt():
    fcnts = ['battery', 'energyGeneration', 'energyConsumption']

    for fcnt in fcnts:
        if fcnt == 'battery':
            data = {
                'm2m:fcnt': {
                    'cnd': fcnt,
                    'rn': fcnt,
                    'level': None,
                    'current': None,
                    'voltage': None,
                    'power': None,
                    'maxvolt': None,
                    'minvolt': None,
                    'temp': None,
                    'charging': None,
                    'discharging': None
                }
            }
        elif fcnt == 'energyGeneration':
            data = {
                'm2m:fcnt': {
                    'cnd': fcnt,
                    'rn': fcnt,
                    'power': None,
                    'current': None,
                    'voltage': None,
                    'daily': None,
                    'monthly': None,
                    'annual': None,
                    'total': None,
                    'maxvolt': None,
                    'minvolt': None
                }
            }
        elif fcnt == 'energyConsumption':
            data = {
                'm2m:fcnt': {
                    'cnd': fcnt,
                    'rn': fcnt,
                    'power': None,
                    'current': None,
                    'voltage': None,
                    'daily': None,
                    'monthly': None,
                    'annual': None,
                    'total': None
                }
            }

        create_fcnt('Modbus_IPE', fcnt, data)

def create_solar_fcnt():
    fcnts = ['deviceInfo', 'userInfo']

    for fcnt in fcnts:
        if fcnt == 'deviceInfo':
            data = {
                'm2m:fcnt': {
                    'cnd': fcnt,
                    'rn': fcnt,
                    'name': None,
                    'lat': None,
                    'long': None,
                    'starttime': None,
                }
            }
        elif fcnt == 'userInfo':
            data = {
                'm2m:fcnt': {
                    'cnd': fcnt,
                    'rn': fcnt,
                    'adUrl': None,
                }
            }
        
        create_fcnt('Solar_AE', fcnt, data)

def create_subs():
    create_sub('Modbus_IPE', 'battery', 'read', f'http://{wrapper_addr}:19998/battery')
    # create_sub('Modbus_IPE', 'battery', 'write', f'http://{wrapper_addr}:3001/write')
    create_sub('Modbus_IPE', 'energyGeneration', 'solar', f'http://{wrapper_addr}:19998/solar')
    create_sub('Modbus_IPE', 'energyConsumption', 'load', f'http://{wrapper_addr}:19998/load')

if __name__ == "__main__":
    # create Modbus_IPE AE, fcnts
    create_sub('Modbus_IPE', 'battery', 'write', f'http://{wrapper_addr}:3001/write')
    create_ae('modbus-ipe', 'Modbus_IPE')
    create_ipe_fcnt()

    # create Solar AE, fcnts
    create_ae('solar-ae', 'Solar_AE')
    create_solar_fcnt()

    input('\n[*] If you want create subscriptions, press any keys (It requires \'solar wrapper\' is running.)')
    create_subs()