<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="pb-8" >
    <div class="cursor-pointer flex flex-wrap justify-center items-center space-x-6 mb-6">
      <img class="h-20" :src="viewCountry.flag" alt="" />
      <h1 class="text-8xl text-white font-semibold max-w-[60%] truncate">
        {{ viewCountry.name }}
      </h1>

      <!-- Search -> ref -->
      <div
        @click="searchOn"
        class="relative bg-slate-100/10 p-4 rounded-full hover:bg-white hover:scale-150 transition group cursor-pointer"
      >
        <span
          class="animate-ping group-hover:animate-none hover:animate-none absolute inset-0 h-full w-full rounded-full border-4 border-slate-50/30 opacity-75"
        ></span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-10 h-10 stroke-white group-hover:stroke-black"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
    </div>
  </div>

  <!-- border-8	border-white	 [clip-path:circle()] -->
<!-- Stat -->
  <div
    class="flex justify-center items-center sm:flex-nowrap flex-wrap mx-auto bg-white max-w-screen-lg shadow-2xl shadow-slate-400/60 rounded-3xl p-8 space-x-8"
  >
    <div class="flex-initial px-8 flexCen flex-col">
      <p
        class="text-sm tracking-wider font-semibold text-slate-400 uppercase mb-4"
      >
        CASES
      </p>
      <h1
        class="text-left text-3xl font-semibold tracking-tight text-slate-900 mb-4 sm:text-5xl"
      >
        <!-- <count-up
          :start-val="0"
          :end-val="viewCountry.cases"
          :duration="3"
        ></count-up> -->
      {{ numF(viewCountry.cases) }}

      </h1>
      <p class="text-xl text-gray-500 mb-4">
        + {{ numeralFunc(viewCountry.todayCases) }}
      </p>
      <sparklineChart :typeC="'cases'" :data="dailyCaseArrayValues" />
    </div>
    <div class="flex-initial px-8 flexCen flex-col">
      <p
        class="text-sm tracking-wider font-semibold text-slate-400 uppercase mb-4"
      >
        RECOVERED
      </p>
      <h1
        class="text-left text-3xl font-semibold tracking-tight text-slate-900 mb-4 sm:text-5xl"
      >
      {{ numF(viewCountry.recovered) }}
        <!-- <count-up
          :start-val="0"
          :end-val="viewCountry.recovered"
          :duration="3"
        ></count-up> -->
      </h1>
      <p class="text-xl text-gray-500 mb-4">
        + {{ numeralFunc(viewCountry.todayRecovered) }}
      </p>
      <sparklineChart :typeC="'recover'" :data="dailyRecoverArrayValues" />
    </div>
    <div class="flex-initial px-8 flexCen flex-col">
      <p
        class="text-sm tracking-wider font-semibold text-slate-400 uppercase mb-4"
      >
        DEATHS
      </p>
      <h1
        class="text-left text-3xl font-semibold tracking-tight text-slate-900 mb-4 sm:text-5xl"
      >
        <!-- <count-up
          :start-val="0"
          :end-val="viewCountry.deaths"
          :duration="3"
        ></count-up> -->
      {{ numF(viewCountry.deaths) }}

      </h1>
      <p class="text-xl text-gray-500 mb-4">
        + {{ numeralFunc(viewCountry.todayDeaths) }}
      </p>
      <sparklineChart :typeC="'death'" :data="dailyDeathArrayValues" />
    </div>
  </div>


</template>

<script>
import numeral from "numeral";
// import CountUp from "vue-countup-v3";
import sparklineChart from "./sparklineChart.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "statCard",
  emits: ["searchOn"],
  props: {
    viewCountry: Object,
    dailyCaseArrayValues: Array,
    dailyRecoverArrayValues: Array,
    dailyDeathArrayValues: Array,
  },
  components: {
    // CountUp,
    sparklineChart,
 
  },
  data() {
    return {
     
    };
  },
 
    // countryIs() {
    //   if(this.viewCountryName) return this.viewCountryName
    //   else return this.yourCountry.name
    // }
 
  methods: {
    searchOn(){
        this.$emit("searchOn")
    },
    numeralFunc(num) {
      return numeral(num).format("0a");
    },
    numF(num) {
      return numeral(num).format("0,0");
    },

    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
