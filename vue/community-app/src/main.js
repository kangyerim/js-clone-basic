// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import cookies from 'js-cookie';

Vue.config.productionTip = false

function init() {
  const savedToken = cookies.get('accessToken');
  if(savedToken) {
    return store.dispatch('signinByToken', savedToken);
  } else {
    return Promise.resolve();
  }
}

init().then(res => {
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
})
