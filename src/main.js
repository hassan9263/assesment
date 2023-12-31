/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import { createPinia } from 'pinia'


// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import piniaPluginPersistedState from "pinia-plugin-persistedstate"

const pinia = createPinia();

pinia.use(piniaPluginPersistedState)


const app = createApp(App)

registerPlugins(app)

app.mount('#app')
