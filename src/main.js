import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueRouter from 'vue-router';

require('./assets/sass/main.scss');
Vue.config.productionTip = false;
Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ]
});


window.echarts = require('echarts/dist/echarts.js');

// eslint-disable-next-line no-undef
Vue.use(echarts);
window.axios = axios;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;


//google analytics
import VueGtag from "vue-gtag";
if(process.env.VUE_APP_ENV === 'production'){
  Vue.use(VueGtag, {
    config: { id: "G-XLT1F25450" }
  }, router);

}

new Vue({
  render: h => h(App),
}).$mount('#app');
