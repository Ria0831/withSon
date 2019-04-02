// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import qs from 'qs'
import md5 from 'js-md5';
import store from './store'

// const axiosCreate = axios.create({
// 	headers:{
// 		token:sessionStorage.getItem('token')
// 	}
// })

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$md5 = md5;
axios.defaults.baseURL = 'http://192.168.1.12:8090/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
if(sessionStorage.getItem('token')){
	axios.defaults.headers.token = sessionStorage.getItem('token');
}
axios.defaults.withCredentials=true;
Vue.prototype.qs = qs;

Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
