<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h2>country is: {{ viewCountry.name }}</h2>
  <h5>Case</h5>
  <h2>{{ viewCountry.cases }}</h2>

  <br />
  <h5>deaths</h5>
  <h2> {{viewCountry.deaths}} </h2>

  <br />
  <h5>recovered</h5>
  <h2> {{viewCountry.recovered}} </h2>

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

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "x",
  props: {
    yourCountry: Object,
    allCountries: Array,
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
    // numeralf(num) {
    //   var numeral = require("numeral");
    //   numeral(num).format("0.0a");
    // },
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
}
.searchSelectCountry input {
  padding: 10px;
  font-size: 20px;
}
.listCountriesSelect {
  box-shadow: 2px 3px 10px #333;
  max-height: 500px;
  overflow-y: scroll;
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
