<template>
  <div>
    <!-- START-Template -->
    <stat :world="world" :cases="cases" :deaths="deaths" :recovered="recovered" />

    <div>
      <a-radio-group v-model:value="vVal" button-style="solid">
        <a-radio-button value="cases">Total cases</a-radio-button>
        <a-radio-button value="deaths">Total deaths</a-radio-button>
        <a-radio-button value="recovered">Total Recovered</a-radio-button>
      </a-radio-group>
    </div>
    <world-chart :allCountries="filteredCountries" :vVal="vVal" />


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
import WorldChart from "@/components/worldChart.vue";
import stat from '@/components/world/stat.vue';
import * as api from "@/api";

// import {  mapMutations } from "vuex";

// import { errorToaster } from "../../shared/service/ErrorHandler.js"
export default {
  components: { WorldChart,stat },
  name: "aboutView",
  props: {},
  data() {
    return {
      vVal: "cases",
      world:{},
      worldHistory:{},
      cases:[],
        deaths:[],
        recovered:[]
    };
  },
  methods: {
    //  VueX
    // ...mapMutations(["FILLTERED_COUNTRIES"]),
    // ...mapActions(["handle"]),
    changeMap() {
      this.$store.dispatch("getAllCountries", this.vVal);
    },
    async getTotalWorld(){
      let res = await api.getTotalWorld()
      let his = await api.getHistoricalWorld()
      this.world = res.data
      this.worldHistory = his.data
      this.cases = Object.values(this.worldHistory.cases)
    this.deaths = Object.values(this.worldHistory.deaths)
    this.recovered = Object.values(this.worldHistory.recovered)

      console.log(" this.worldHistory ",this.worldHistory)
    }
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
    this.getTotalWorld()
    // this.$store.dispatch("getUserCountry");
  },
  updated() {},
};
</script>

<style scoped></style>
