import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueKakaoSdk from 'vue-kakao-sdk'
import VueClipboard from 'vue-clipboard2'

Vue.config.productionTip = false

VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)

const apiKey = process.env.VUE_APP_KAKAO_API_KEY
Vue.use(VueKakaoSdk, {apiKey})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

