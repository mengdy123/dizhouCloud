import Vue from 'vue'
import App from './App'
import router from './router'
import AMap from 'vue-amap'
import 'lib-flexible/flexible'
import dataV from '@jiaminghi/data-view'
import './utils/rem'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import less from 'less'
import "./style/color.less";
import './style/reset.less'
import * as THREE from "three";
import store from './store'
import IconSvg from '@/components/Icon'

Vue.prototype.$eventBus = new Vue()
Vue.component('icon-svg', IconSvg)
Vue.use(THREE)
Vue.use(dataV)
Vue.use(AMap)
Vue.use(less)
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})



