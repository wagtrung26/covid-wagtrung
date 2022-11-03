<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex justify-center items-center space-x-6 mb-4">
    <img class="h-20" :src="viewCountry.flag" alt="" />
    <h1 class="text-8xl text-white font-semibold leading-none truncate ">
      {{ viewCountry.name }}
    </h1>
    <!-- Search -> ref -->
    <div
     @click="seachOn = !seachOn"
      class="relative bg-slate-100/10 p-4 rounded-full hover:bg-white  hover:scale-125 transition group cursor-pointer"
    >
      <span
        class="animate-ping group-hover:animate-none absolute inset-0 h-full w-full rounded-full border-2 border-slate-50/20 opacity-75"
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
  <br />

  <!-- border-8	border-white	 [clip-path:circle()] -->

  <div
    class="flex justify-center items-center flex-wrap mx-auto bg-white max-w-screen-lg shadow-2xl rounded-3xl p-8 space-x-8"
  >
    <div class="px-8 flexCen flex-col">
      <p
        class="text-sm tracking-wider font-semibold text-slate-400 uppercase mb-4"
      >
        CASES
      </p>
      <h1
        class="text-left text-3xl font-semibold tracking-tight text-slate-900 mb-4 sm:text-5xl"
      >
        <count-up
          :start-val="0"
          :end-val="viewCountry.cases"
          :duration="3"
        ></count-up>
      </h1>
      <p class="text-xl text-gray-500 mb-4">
        + {{ numeralFunc(viewCountry.todayCases) }}
      </p>
      <sparklineChart :typeC="'cases'" :data="dailyCaseArrayValues" />
    </div>
    <div class="px-8 flexCen flex-col">
      <p
        class="text-sm tracking-wider font-semibold text-slate-400 uppercase mb-4"
      >
        RECOVERED
      </p>
      <h1
        class="text-left text-3xl font-semibold tracking-tight text-slate-900 mb-4 sm:text-5xl"
      >
        <count-up
          :start-val="0"
          :end-val="viewCountry.recovered"
          :duration="3"
        ></count-up>
      </h1>
      <p class="text-xl text-gray-500 mb-4">
        + {{ numeralFunc(viewCountry.todayRecovered) }}
      </p>
      <sparklineChart :typeC="'recover'" :data="dailyRecoverArrayValues" />
    </div>
    <div class="px-8 flexCen flex-col">
      <p
        class="text-sm tracking-wider font-semibold text-slate-400 uppercase mb-4"
      >
        DEATHS
      </p>
      <h1
        class="text-left text-3xl font-semibold tracking-tight text-slate-900 mb-4 sm:text-5xl"
      >
        <count-up
          :start-val="0"
          :end-val="viewCountry.deaths"
          :duration="3"
        ></count-up>
      </h1>
      <p class="text-xl text-gray-500 mb-4">
        + {{ numeralFunc(viewCountry.todayDeaths) }}
      </p>
      <sparklineChart :typeC="'death'" :data="dailyDeathArrayValues" />
    </div>
  </div>

<modal title="Select a country" v-if="seachOn">
  <div
    class="searchSelectCountry "   
  >
  <div class="">
    <input class="z-10 bg-white shadow-lg " type="text" v-model="vModelCountry" placeholder="Type your a country's name" />
    <!-- <button>search</button> -->
    <div class="listCountriesSelect " >
      <ul  v-for="(country, index) in filteredAllCountries" :key="index" class="odd:bg-white even:bg-slate-50">
        <li  @click="countryClickComp(country.code)">
          <div class="flex items-center justify-between pr-4 ">
            <!-- left -->
            <div class="flex items-center justify-around">
              <span class="flexCen p-3 h-1 w-1 bg-slate-900/70 text-white rounded text-xs mr-4  ">{{ index + 1 }}</span>
              <img class=" h-9 mr-2 [clip-path:circle()]" :src="country.flag" alt="" />
              <div>
              <h4 class="text-base leading-relaxed font-semibold tracking-tight text-slate-900">{{ country.name }}</h4>
              <p>{{ country.continent }}</p>
              </div>
            </div>
          <!-- right -->
            <div >
              {{ numF(country.cases)}}
            </div>
          </div>
        </li>
      </ul>
    </div>
    </div>

  </div>

  </modal>
</template>

<script>
import numeral from "numeral";
import CountUp from "vue-countup-v3";
import sparklineChart from "./sparklineChart.vue";
import modal from '@/components/comp/modal.vue';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "statCard",
  props: {
    allCountries: Array,
    viewCountry: Object,
    dailyCaseArrayValues: Array,
    dailyRecoverArrayValues: Array,
    dailyDeathArrayValues: Array,
  },
  components: {
    CountUp,
    sparklineChart,
    modal
  },
  data() {
    return {
      vModelCountry: "",
      showList: false,
      type: "cases",
      seachOn: false
    };
  },
  computed: {
    filteredAllCountries() {
      const _ = require("lodash");

      let countries = this.allCountries;
      let sortedCountries = _.orderBy(countries, [this.type], ["desc"]);
      console.log(sortedCountries);

      return sortedCountries.filter((country) => {
        var countryN = country.name.toLowerCase(),
          vModel = this.vModelCountry.toLowerCase();
        return countryN.startsWith(vModel);
      });
    },
    // countryIs() {
    //   if(this.viewCountryName) return this.viewCountryName
    //   else return this.yourCountry.name
    // }
  },
  methods: {
    // outInputClick(){
    //   this.showList = !this.showList
    //   this.vModelCountry =" "
    // },
    // searchClick(){
  
      // console.log(" this.refs.search ", this.$refs)
      // this.search.value.focus()
      // this.$refs.search.click()
      

    // },
    changed() {
      this.type = "deaths";
      console.log(this.type);
    },
    numeralFunc(num) {
      return numeral(num).format("0.000 a");
    },
     numF(num) {
      return numeral(num).format("0,0");
    },

    countryClickComp(countryCode) {
      this.vModelCountry = "";
      this.$emit("countryClickComp", countryCode);
      this.seachOn = false
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  margin: 0;
  padding: 0;
}
li {
  cursor: pointer;
  list-style: none;
  padding: 20px 10px;
  text-align: left;
}
li:hover {
  background-color: #ddd;
}
.countryFlag {
  width: 50px;
  height: auto;
}
.countryFlagHead {
  width: 80px;
  height: auto;
}

/* .searchSelectCountry {
  position: absolute;
  top: 200px;
  right: 0;
  z-index: 2;
} */
.searchSelectCountry input {
  padding: 14px;
  font-size: 20px;
  width: 100%;
  /* background: rgb(239, 239, 239); */
  /* border-bottom: 1px solid rgb(190, 190, 190); */
  position: sticky;
  top:0
}
.listCountriesSelect {
  /* box-shadow: 0px 3px 20px rgba(124, 124, 124, 0.35); */
  /* border-radius: 20px; */
  /* max-height: 500px; */
  /* background: rgb(252, 252, 252); */
}
.spacebtw {
  justify-content: space-between;
}
</style>
