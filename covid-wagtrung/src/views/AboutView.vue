<template>
  <div class="mx-30">
    <!-- START-Template -->
    <!-- <p>{{ allCountriesVuex }}</p> -->
    <h1>Worldwide</h1>
    <stat
      :world="world"
      :cases="dCases"
      :deaths="dDeaths"
      :recovered="dRecovered"
    />

    <div>
      <a-radio-group v-model:value="vVal" button-style="solid">
        <a-radio-button value="cases">Total cases</a-radio-button>
        <a-radio-button value="deaths">Total deaths</a-radio-button>
        <a-radio-button value="recovered">Total Recovered</a-radio-button>
      </a-radio-group>
    </div>
    <world-chart :allCountries="filteredCountries" :vVal="vVal" />

    <dailyChart
      :dailyCaseArrayValues="dCases"
      :dailyRecoverArrayValues="dRecovered"
      :dailyDeathArrayValues="dDeaths"
      :dates="dates"
    ></dailyChart>

    <stackChart
      :dailyActiveArrayValues="dCases"
      :dailyRecoverArrayValues="dRecovered"
      :dailyDeathArrayValues="dDeaths"
      :dates="dates"
    ></stackChart>

    <lineChart
      :caseArrayValues="cases"
      :recoverArrayValues="recovered"
      :deathArrayValues="deaths"
      :dates="dates"
    ></lineChart>

    <columnDrill
      :continentDrill="continentDrill"
      :Asia="Asia1"
      :Europe="Europe1"
      :Africa="Africa1"
      :NorthAmerica="NorthAmerica1"
      :SouthAmerica="SouthAmerica1"
      :Oceania="Oceania1"
    />

    <packedBubble
      :Asia="Asia"
      :Europe="Europe"
      :Africa="Africa"
      :NorthAmerica="NorthAmerica"
      :SouthAmerica="SouthAmerica"
      :Oceania="Oceania"
    />

    <tableC :continentArray="allCountriesVuex" />

    <!-- VUEX test -->
    <!-- <p>{{ $store.state.userCountry }}</p> -->
    <!-- <p>{{ $store.state.allCountries }}</p> -->
    <!-- <p>{{ count }}</p> -->
    <!-- Mutation call -->
    <!-- <a-button @click="increase(3)">click</a-button> -->
    <!-- Action call -->
    <!-- <a-button @click="handle">click</a-button> -->

    <!-- END-Template -->
  </div>
</template>

<script>
import WorldChart from "@/components/world/worldChart.vue";
import dailyChart from "@/components/chart/dailyChart.vue";
import lineChart from "@/components/chart/lineChart.vue";
import columnDrill from "@/components/chart/columnDrill.vue";
import stackChart from "@/components/chart/stackChart.vue";
import packedBubble from "@/components/world/packedbubble.vue";
import tableC from "@/components/comp/table.vue";
import stat from "@/components/world/stat.vue";
import * as api from "@/api";

// import {  mapMutations } from "vuex";

// import { errorToaster } from "../../shared/service/ErrorHandler.js"
export default {
  components: {
    WorldChart,
    stat,
    dailyChart,
    lineChart,
    stackChart,
    tableC,
    packedBubble,
    columnDrill,
  },
  name: "aboutView",
  props: {},
  data() {
    return {
      vVal: "cases",
      world: {},
      worldHistory: {},
      cases: [],
      deaths: [],
      recovered: [],
      dCases: [],
      dDeaths: [],
      dRecovered: [],
      dates: [],
      Asia: [],
      Europe: [],
      Africa: [],
      NorthAmerica: [],
      SouthAmerica: [],
      Oceania: [],
      Asia1: [],
      Europe1: [],
      Africa1: [],
      NorthAmerica1: [],
      SouthAmerica1: [],
      Oceania1: [],
      Continents: [],
      continentDrill: [],
    };
  },
  methods: {
    //  VueX
    // ...mapMutations(["DAILY_CALCULATE"]),
    // ...mapActions(["handle"]),
    DAILY_CALCULATE(mockArray) {
      let chartDataY = [];
      let lastData;
      mockArray.forEach((item) => {
        if (lastData >= 0) {
          let newDataY = Math.abs(item - lastData);
          chartDataY.push(newDataY);
        }
        lastData = item;
      });

      return chartDataY;
    },
    CONTINENT_CALCULATE() {
       const _ = require("lodash");
      let k = _.orderBy(this.allCountriesVuex, ["cases"], ["desc"])
      console.log(" this.allCountriesVuex ",k)
      k.forEach((item) => {
        let name = item.country;
        if (item.continent == "Asia") {
          this.Asia.push({ name: name, value: item.cases });
          this.Asia1.push([name, item.cases]);
        } else if (item.continent == "Europe") {
          this.Europe1.push([name, item.cases]);
          this.Europe.push({ name: name, value: item.cases });
        } else if (item.continent == "Africa") {
          this.Africa1.push([name, item.cases]);
          this.Africa.push({ name: name, value: item.cases });
        } else if (item.continent == "North America") {
          this.NorthAmerica.push({ name: name, value: item.cases });
          this.NorthAmerica1.push([name, item.cases]);
        } else if (item.continent == "South America") {
          this.SouthAmerica.push({ name: name, value: item.cases });
          this.SouthAmerica1.push([name, item.cases]);
        } else {
          this.Oceania.push({ name: name, value: item.cases });
          this.Oceania1.push([name, item.cases]);
        }

      });
      console.log(" as ", this.Asia);
    },

    changeMap() {
      this.$store.dispatch("getAllCountries", this.vVal);
    },
    async getTotalWorld() {
      const _ = require("lodash");
      let res = await api.getTotalWorld();
      let his = await api.getHistoricalWorld();
      let con = await api.getTotalContinents();
      this.world = res.data;
      this.worldHistory = his.data;
      this.Continents = con.data;
      // total
      this.cases = _.values(this.worldHistory.cases);
      this.deaths = Object.values(this.worldHistory.deaths);
      this.recovered = Object.values(this.worldHistory.recovered);
      this.dates = _.keys(this.worldHistory.cases);
      // daily
      this.dCases = this.DAILY_CALCULATE(this.cases);
      this.dDeaths = this.DAILY_CALCULATE(this.deaths);
      this.dRecovered = this.DAILY_CALCULATE(this.recovered);
      // continent
      this.CONTINENT_CALCULATE();
      this.Continents.forEach((item) => {
        this.continentDrill.push({
          name: item.continent,
          y: item.cases,
          drilldown: item.continent,
        });
      });
      this.continentDrill = _.orderBy(this.continentDrill, ["y"], ["desc"]);


      console.log("  this.continentDrill ", this.continentDrill);
    },
  },
  computed: {
    //  ...mapGetters(["count"]),
    allCountriesVuex() {
      return this.$store.state.allCountries;
    },
    filteredCountries() {
      return this.$store.state.filterCountries;
    },
  },
  watch: {
    vVal() {
      this.changeMap();
    },
  },

  created() {
    this.$store.dispatch("getAllCountries", this.vVal);
    this.getTotalWorld();
    // this.$store.dispatch("getUserCountry");
  },
  updated() {},
};
</script>

<style scoped></style>
