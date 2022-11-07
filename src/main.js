import { createApp} from 'vue'
// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//chart 
// import Vue from 'vue'
import HighchartsVue from 'highcharts-vue'
import VueApexCharts from "vue3-apexcharts"
import VueProgressBar from "@aacassandra/vue3-progressbar";
//ant
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './assets/tailwind.css'

const options = {
    color: "#17d66d",
    failedColor: "#874b4b",
    thickness: "10px",
    transition: {
      speed: "0.8s",
      opacity: "0.6s",
      termination: 300,
    },
  };
// Vue.config.silent = true;
const app = createApp(App);
app.use(store)
.use(router)
.use(HighchartsVue)
.use(VueApexCharts)
.use(Antd)
.use(VueProgressBar, options)
.mount('#app')