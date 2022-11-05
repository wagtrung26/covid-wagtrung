<template>

  <!-- <h3>this is {{}}</h3> -->
   <div class="flex stat flex7">
      <div class="case mr">
        <h5>CASES</h5>
        <h1 class="stat-lg">
          <count-up :end-val="world.cases" :duration="1"></count-up>
        </h1>
        <p>+ {{ numeralFunc(world.todayCases) }}</p>
        <sparklineChart :typeC="'cases'" :data="cases" />
      </div>

      <div class="rec mr">
        <h5>RECOVERED</h5>
        <h1 class="stat-lg">
          <count-up :end-val="world.recovered" :duration="1"></count-up>
        </h1>
        <p>+ {{ numeralFunc(world.todayRecovered) }}</p>
        <sparklineChart :typeC="'recover'" :data="recovered" />
      </div>

      <div class="death">
        <h5>DEATHS</h5>
        <h1 class="stat-lg">
          <count-up :end-val="world.deaths" :duration="1"></count-up>
        </h1>
        <p>+ {{ numeralFunc(world.todayDeaths) }}</p>
        <sparklineChart :typeC="'death'" :data="deaths" />
      </div>
    </div>

</template>

<script>
// import { mapGetters, mapMutations, mapActions } from "vuex";
import numeral from "numeral";
import CountUp from "vue-countup-v3";
import sparklineChart from "@/components/sparklineChart.vue";

export default {
  components: { CountUp,sparklineChart },
  name: "vueX",
  props: {
    world: Object,
    cases: Array,
    deaths: Array,
    recovered: Array,
   
    // propSample: {
    //   type: String,
    //   default: "col-md-3",
    // },
  },
  data() {
    return {
        
    };
  },
  methods: {
    numeralFunc(num) {
      return numeral(num).format("0.000 a");
    },
    // VUEX-Method
    // ...mapMutations(["increase"]),
    // VUEX-Action
    // ...mapActions(["handle"]),
    // Method
  
  },
  computed: {
    // VUEX-State
    // ...mapGetters(["count"]),
    // Computed
    // cases() {
    //   return Object.values(this.worldHistory.cases);
    // },
    // deaths(){
    //   return Object.values(this.worldHistory.deaths);

    // },
    //  recovered(){
    //   return Object.values(this.worldHistory.recovered);

    // }
  },
  created() {
    
  },
  mounted() {
    
  },
  updated() {},
};
</script>

<style scoped></style>
