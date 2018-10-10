// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import './assets/css/custom-element.scss'
import axios from 'axios'
import { EventEmitter2 as _EventEmitter2 } from 'eventemitter2'
import { createAxiosInstance } from './assets/js/api'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const EventService = new _EventEmitter2()

Vue.prototype.$EventService = EventService

Vue.use(Vuex)
Vue.use(ElementUI)

// vuex配置
const store = new Vuex.Store({
  state: {
    config: JSON.parse(sessionStorage.getItem('config'))
  },
  mutations: {
    updateConfig(state, configValue) {
      state.config = configValue
      sessionStorage.setItem('config', JSON.stringify(state.config))
    }
  }
})

router.beforeEach((to, from, next) => {
  next()
})

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'production') {
  axios.get('config.json', {
    headers: {
      'Cache-Control': 'no-cache'
    }
  }).then((result) => {
    store.commit('updateConfig', result.data)
    initApp()
  }).catch((error) => { console.log(error) })
} else {
  store.commit('updateConfig', process.env)
  initApp()
}

function initApp() {
  console.log(store.state.config)
  Vue.prototype.$http = createAxiosInstance({baseURL: store.state.config.API_ROOT})
  Vue.prototype.$getStatic = createAxiosInstance()
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
}
