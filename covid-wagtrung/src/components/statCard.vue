<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flexC">
    <img class="countryFlag" :src="viewCountry.flag" alt="" />
    <h1>{{ viewCountry.name }}</h1>
  </div>

  <div class="flex stat">
    <div class="case">
      <h5>CASES</h5>
      <h1>
        <count-up  :end-val="viewCountry.cases" :duration="1"></count-up>
      </h1>
      <p>+ {{ numeralFunc(viewCountry.todayCases) }}</p>
    </div>

    <div class="rec">
      <h5>RECOVERED</h5>
      <h1>
        <count-up
          :end-val="viewCountry.recovered"
          :duration="1"
        ></count-up>
      </h1>
      <p>+ {{ numeralFunc(viewCountry.todayRecovered) }}</p>
    </div>

    <div class="death">
      <h5>DEATHS</h5>
      <h1>
        <count-up :end-val="viewCountry.deaths" :duration="1"></count-up>
      </h1>
      <p>+ {{ numeralFunc(viewCountry.todayDeaths) }}</p>
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

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "statCard",
  props: {
    allCountries: Array,
    yourCountryCode: String,
    viewCountry: Object,
  },
  components: {
    CountUp,
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
      this.vModelCountry =""
      this.$emit('countryClickComp',countryCode) 
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
.flexC {
  display: flex;
  justify-content: center;
  align-items: center;
}
.stat {
  width: 500px;
  margin: 0 auto;
  box-shadow: 0px 3px 20px rgb(124, 124, 124);
  padding: 20px 40px;
}
</style>
