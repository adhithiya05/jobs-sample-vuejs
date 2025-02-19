import Vue from "vue";
import App from "./App.vue";

import BootsrapVue from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;

Vue.use(BootsrapVue);

new Vue({
  render: h => h(App)
}).$mount("#app");
