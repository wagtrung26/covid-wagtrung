import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//chart 
// import Vue from 'vue'
import HighchartsVue from 'highcharts-vue'
import VueApexCharts from "vue3-apexcharts"

const app = createApp(App);
app.use(store)
.use(router)
.use(HighchartsVue)
.use(VueApexCharts)
.mount('#app')