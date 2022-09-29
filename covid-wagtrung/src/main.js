import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//chart 
// import Vue from 'vue'
import HighchartsVue from 'highcharts-vue'

createApp(App).use(store).use(router).use(HighchartsVue).mount('#app')