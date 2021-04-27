
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.prototype.Event = new Vue()
// reset.css
import './assets/css/reset.css'
//公共组件
import './components/index.js'
// 过滤器
import './filters/index.js'
// 仓库
import store from './store/index.js'
// ElementUi
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUi)
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
