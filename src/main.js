import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from '@/plugins/vuetify'; // path to vuetify export
import VueToastr from 'vue-toastr';
import axios from 'axios';

import Loader from './components/Loader';
import DefaultLayout from '@/layouts/default-layout';

import VueCurrencyFilter from 'vue-currency-filter';

Vue.use(VueCurrencyFilter, {
  symbol: '$',
  thousandsSeparator: '.',
  fractionCount: 0,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true,
});

Vue.use(VueToastr, {
  defaultTimeout: 3000,
  defaultPosition: 'toast-top-right',
  /* OverWrite Plugin Options if you need */
});

// Interceptores
axios.defaults.baseURL = 'http://localhost:8000/api/';
axios.interceptors.request.use(
  (request) => {
    const token = window.localStorage.getItem('token');
    if (token) {
      request.headers.common.Authorization = 'Bearer ' + token;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    //console.log('response:', response)

    return response;
  },
  (error) => {
    console.log('error response:', error.response);
    return Promise.reject(error);
  }
);
// Fin Interceptores

Vue.prototype.$http = axios;

Vue.component('loader', Loader);
Vue.component('default-layout', DefaultLayout);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
