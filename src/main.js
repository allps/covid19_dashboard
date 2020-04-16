import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueRouter from 'vue-router';
import Buefy from 'buefy'

import 'buefy/dist/buefy.css';

require('./assets/sass/main.scss');
Vue.config.productionTip = false;

Vue.use(VueRouter);
const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            name: 'Home',
            path: '/',
            component: () => {
                return import('./components/LandingPage')
            }
        },
        {
            name: 'Covid-19 Information',
            path: "/covid19-information",
            component: () => {
                return import('./components/AboutCovid19')
            }
        },
        {
            name: 'FAQs',
            path: "/faqs",
            component: () => {
                return import('./components/Faqs')
            }
        },
        {
            name: 'Economic Impact due to covid-19',
            path: "/EconomicImpact",
            component: () => {
                return import('./components/EconomicImpact')
            }
        },
        {
            name: 'Page Not Found',
            path: "*",
            component: () => {
                return import('./components/PageNotFound')
            }
        },

        {
            name: 'US Visualization',
            path: "/details/us",
            component: () => {
                return import('./components/details/Usa')
            }
        },
        {
            name: 'India Visualization',
            path: "/details/india",
            component: () => {
                return import('./components/details/India')
            }
        },
        {
            name: 'Switzerland Visualization',
            path: "/details/switzerland",
            component: () => {
                return import('./components/details/Switzerland')
            }
        },

    ]
});

Vue.use(Buefy);
window.echarts = require('echarts/dist/echarts.js');

// eslint-disable-next-line no-undef
Vue.use(echarts);
window.axios = axios;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;


//google analytics
import VueGtag from "vue-gtag";

if (process.env.VUE_APP_ENV === 'production') {
    Vue.config.silent = true;
    Vue.use(VueGtag, {
        config: {id: "G-XLT1F25450"}
    }, router);

}

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
