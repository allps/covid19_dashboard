import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueRouter from 'vue-router';
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'




Vue.use(Buefy)
require('./assets/sass/main.scss');
Vue.config.productionTip = false
Vue.use(VueRouter);
// eslint-disable-next-line no-undef


window.echarts = require('echarts/dist/echarts.js');

// eslint-disable-next-line no-undef
Vue.use(echarts);
window.axios = axios;
axios.defaults.baseURL = "http://127.0.0.1:8000/";

new Vue({
  render: h => h(App),
}).$mount('#app')
