import { createApp} from 'vue'
// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//chart 
// import Vue from 'vue'
import HighchartsVue from 'highcharts-vue'
import VueApexCharts from "vue3-apexcharts"
//ant
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './assets/tailwind.css'

// Vue.config.silent = true;
const app = createApp(App);
app.use(store)
.use(router)
.use(HighchartsVue)
.use(VueApexCharts)
.use(Antd)
.mount('#app')