import Vue from 'vue'
import App from './App.vue'
import router from './router'
import config from "./config";
import './assets/style/base.less'


import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);

import Nodata from '@/components/nodata'
Vue.component('Nodata', Nodata)

import VueContentPlaceholders from 'vue-content-placeholders'
Vue.use(VueContentPlaceholders)

function development() {
  console.log("开发模式")
  Vue.prototype.$publicPath = config.publicPath.dev
  Vue.prototype.$baseUrl = config.baseUrl.dev
}

function production() {
  console.log("生产模式")
  Vue.prototype.$publicPath = config.publicPath.pro
  Vue.prototype.$baseUrl = config.baseUrl.pro
}

process.env.NODE_ENV === 'development' ? development() : (process.env.VUE_APP_TITLE === 'production' ? production() : production())

// 路由跳转时定位到顶部
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
  // 或
  // window.scroll(0, 0);
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
