import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueRouter from 'vue-router';
import Buefy from 'buefy'



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
        name: 'About Covid-19',
        path: "/about",
        component: () => {
          return import('./components/AboutCovid19')
        }
      },
        {
            name: 'Page Not Found',
            path: "*",
            component: () => {
                return import('./components/LandingPage')
            }
        },

        {
            name: 'US Visualization',
            path: "/us-visualization",
            component: () => {
                return import('./components/USvisualization')
            }
        },

    ]
});

Vue.use(Buefy)
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
