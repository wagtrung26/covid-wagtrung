<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h1>{{ viewCountry.name }}</h1>

  <div class="flex stat">
    <div class="case">
      <h5>CASES</h5>
      <h1>
        <count-up :end-val="this.viewCountry.cases" :duration="2"></count-up>
      </h1>
      <p>+ {{ this.numeralFunc(viewCountry.todayCases) }}</p>
    </div>

    <div class="rec">
      <h5>RECOVERED</h5>
      <h1>
        <count-up
          :end-val="this.viewCountry.recovered"
          :duration="2"
        ></count-up>
      </h1>
      <p>+ {{ this.numeralFunc(viewCountry.todayRecovered) }}</p>
    </div>

    <div class="death">
      <h5>DEATHS</h5>
      <h1>
        <count-up :end-val="this.viewCountry.deaths" :duration="2"></count-up>
      </h1>
      <p>+ {{ this.numeralFunc(viewCountry.todayDeaths) }}</p>
    </div>
  </div>

  <div
    class="searchSelectCountry"
    @click="this.showList = !this.showList"
    @blur="this.showList = !this.showList"
  >
    <input type="text" v-model="vModelCountry" placeholder="Select a country" />
    <!-- <button>search</button> -->

    <button @click="changed()">type deaths</button>
    <div class="listCountriesSelect" v-if="showList">
      <ul v-for="(country, index) in filteredAllCountries" :key="index">
        <li @click="countryClick(country.code)">
          <div class="flex">
            <div class="left">
              <span>{{ index + 1 }}</span>
              <img class="countryFlag" :src="country.flag" alt="" />
              {{ country.name }}
            </div>

            <div class="right">
              {{ country.cases }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import * as api from "@/api";
import numeral from "numeral";
import CountUp from "vue-countup-v3";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "x",
  props: {
    yourCountry: Object,
    allCountries: Array,
  },
  components: {
    CountUp,
  },
  data() {
    return {
      viewCountry: {},
      vModelCountry: "",
      showList: false,
      type: "cases",
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
    changed() {
      this.type = "deaths";
      console.log(this.type);
    },
    numeralFunc(num) {
      // var numeral = require("numeral");
      return numeral(num).format("0.000 a");
    },
    // loadYourCountryName() {
    //   api.loadCountryName(this.yourCountry.name);
    // },
    countryClick(countryCode) {
      var country = this.allCountries.find((i) => i.code === countryCode);
      this.viewCountry = country;
      this.vModelCountry = "";
      console.log("my country", country);
      // this.viewCountryName = country.name
      // this.viewCountry.cases = country.cases;
      // this.viewCountry.deaths = country.deaths;
      // this.viewCountry.recovered = country.recovered;
    },
  },

  created() {
    this.countryClick(this.yourCountry.code);
    // this.loadYourCountryName();
  },
  updated() {
    // this.filteredAllCountries()
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
  padding: 10px;
  text-align: left;
}
li:hover {
  background-color: #ddd;
}
.countryFlag {
  width: 50px;
  height: auto;
}
.searchSelectCountry {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
}
.searchSelectCountry input {
  padding: 10px;
  font-size: 20px;
}
.listCountriesSelect {
  box-shadow: 0px 3px 20px rgb(124, 124, 124);
  max-height: 500px;
  overflow-y: scroll;
  background: rgb(252, 252, 252);
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.stat {
  width: 500px;
  margin: 0 auto;
  box-shadow: 0px 3px 20px rgb(124, 124, 124);
  padding: 20px 40px;
}
</style>
