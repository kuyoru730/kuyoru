import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import './css/global.less'

Vue.config.productionTip = false

Vue.config.keyCodes={
  enter: [13,108],
  esc: 27
}

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
