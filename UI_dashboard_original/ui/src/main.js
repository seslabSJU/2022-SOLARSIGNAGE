import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueRouter from 'vue-router';
import { routes } from './router/routes';
import { index } from './components/index';
import VueCarousel from 'vue-carousel'
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import Widgets from 'fusioncharts/fusioncharts.widgets';
import PowerCharts from 'fusioncharts/fusioncharts.powercharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import VueFusionCharts from 'vue-fusioncharts';
import VueGeolocation from 'vue-browser-geolocation';
import AxiosPlugin from 'vue-axios-cors'; // add cors

Charts(FusionCharts);
PowerCharts(FusionCharts);
Widgets(FusionCharts);
FusionTheme(FusionCharts);

Vue.use(VueFusionCharts, FusionCharts);
// Router
Vue.use(VueRouter);

Vue.use(VueGeolocation);

Vue.use(VueCarousel);

//add cors
Vue.use(AxiosPlugin);

const router = new VueRouter({ //make router instance
    routes, //
    linkActiveClass: 'open active',
    scrollBehavior: () => ({ y: 0 }),
    mode: 'hash'
});

new Vue({ //insert router in real using instance Vue
    el: '#app',
    router,
    store,
    render: h => h(App),
    components: { App }
})