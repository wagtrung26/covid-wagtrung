<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flexC">
    <img class="countryFlagHead" :src="viewCountry.flag" alt="" />
    <h1 class="textXl mr">{{ viewCountry.name }}</h1>
  </div>
  <br />
  <div class="flex stat">
    <div class="case mr">
      <h5>CASES</h5>
      <h1 class="stat-lg">
        <count-up :end-val="viewCountry.cases" :duration="1"></count-up>
      </h1>
      <p>+ {{ numeralFunc(viewCountry.todayCases) }}</p>
      <sparklineChart :typeC="'cases'" :data="dailyCaseArrayValues" />
    </div>

    <div class="rec mr">
      <h5>RECOVERED</h5>
      <h1 class="stat-lg">
        <count-up :end-val="viewCountry.recovered" :duration="1"></count-up>
      </h1>
      <p>+ {{ numeralFunc(viewCountry.todayRecovered) }}</p>
      <sparklineChart :typeC="'recover'" :data="dailyRecoverArrayValues" />
    </div>

    <div class="death">
      <h5>DEATHS</h5>
      <h1 class="stat-lg">
        <count-up :end-val="viewCountry.deaths" :duration="1"></count-up>
      </h1>
      <p>+ {{ numeralFunc(viewCountry.todayDeaths) }}</p>
      <sparklineChart :typeC="'death'" :data="dailyDeathArrayValues" />
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
        <li @click="countryClickComp(country.code)">
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
import numeral from "numeral";
import CountUp from "vue-countup-v3";
import sparklineChart from "./sparklineChart.vue";

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
  },
  data() {
    return {
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
      return numeral(num).format("0.000 a");
    },
    countryClickComp(countryCode) {
      this.vModelCountry = "";
      this.$emit("countryClickComp", countryCode);
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
.countryFlagHead {
  width: 80px;
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
  box-shadow: 0px 3px 20px rgba(124, 124, 124, 0.35);
  border-radius: 20px;
  max-height: 500px;
  overflow-y: scroll;
  background: rgb(252, 252, 252);
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flexC {
  display: flex;
  justify-content: center;
  align-items: center;
}
/* .rec h1{
  color: rgb(23, 214, 109)
}
.death h1{
  color: rgb(214, 23, 45)
}
.case h1{
  color: rgb(0, 147, 255)
} */
.rec,
.death,
.case {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
}
.stat {
  width: fit-content;
  margin: 0 auto;
  box-shadow: 0px 3px 20px rgba(124, 124, 124, 0.35);
  border-radius: 20px;
  padding: 20px 40px;
}
.stat-lg {
  font-size: 2.5rem;
  margin: 0;
}
.mr {
  margin-right: 50px;
}
</style>
