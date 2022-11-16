/* Set up using Vue 3 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGear, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons'
import { create } from 'core-js/core/object'
library.add(faGear, faToggleOn, faToggleOff)

const app = createApp(App)

app.use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')

app.config.globalProperties.axios = axios
