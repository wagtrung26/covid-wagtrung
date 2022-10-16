<template>
  <div>
    <!-- START-Template -->
    <div>
      <p>{{ vVal }}</p>
      <a-radio-group
        v-model:value="vVal"
        button-style="solid"
        @click="changeMap"
      >
        <a-radio-button value="cases">Total cases</a-radio-button>
        <a-radio-button value="deaths">Total deaths</a-radio-button>
        <a-radio-button value="recovered">Total Recovered</a-radio-button>
      </a-radio-group>
    </div>
    <world-chart :allCountries="filterCountries" :vVal="vVal"/>
    <!-- VUEX test -->
    <p>{{ $store.state.userCountry }}</p>
    <p>{{ $store.state.allCountries }}</p>
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
// import { mapGetters, mapMutations, mapActions } from "vuex";

// import { errorToaster } from "../../shared/service/ErrorHandler.js"
export default {
  components: { WorldChart },
  name: "aboutView",
  props: {},
  data() {
    return { filterCountries:[], vVal: "deaths" };
  },
  methods: {
    //  VueX
    // ...mapMutations(["increase"]),
    // ...mapActions(["handle"]),
    changeMap() {
      this.filterCountries = [];
      this.allCountriesVuex.forEach((item) => {
        let cCode = item.countryInfo.iso2;
        let k;
        if (cCode) {
          k = cCode.toLowerCase();
        }
        let cCases = item[this.vVal];
        let x = [k, cCases];
        this.filterCountries.push(x);
      });
      console.log(" this.filterCountries ", this.filterCountries);
      console.log(" vVal ", this.vVal);
    },
  },
  computed: {
    //  ...mapGetters(["count"]),
    allCountriesVuex() {
      return this.$store.state.allCountries;
    },
  },
  updated() {
    if (!this.filterCountries.length) {
      this.changeMap();
    }
  },
  created() {
    this.$store.dispatch("getAllCountries");
    this.$store.dispatch("getUserCountry");
  },
};
</script>

<style scoped></style>
