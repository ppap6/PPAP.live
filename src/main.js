// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
//mavon-editor markdown及html样式
// import 'mavon-editor/dist/highlightjs/highlight.min.js'
import 'mavon-editor/dist/highlightjs/styles/github.min.css'
// import 'mavon-editor/dist/markdown/github-markdown.min.css'
// import 'mavon-editor/dist/katex/katex.min.js'
// import 'mavon-editor/dist/katex/katex.min.css'

// use
Vue.use(mavonEditor)

Vue.config.productionTip = false

/* eslint-disable no-new */
const VM = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

export default VM
