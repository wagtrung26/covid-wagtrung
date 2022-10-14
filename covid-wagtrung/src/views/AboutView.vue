<template>
  <div>
    <!-- START-Template -->
    <world-chart :allCountries="allCountriesVuex"/>
     <!-- VUEX test -->
     <p>{{ $store.state.userCountry}}</p> 
    <p>{{ $store.state.allCountries}}</p> 
    <!-- <p>{{ count }}</p> -->
    <!-- Mutation call -->
    <!-- <a-button @click="increase(3)">click</a-button> -->
    <!-- Action call -->
    <!-- <a-button @click="handle">click</a-button> -->

    <!-- END-Template -->
  </div>
</template>

<script>
import WorldChart from '@/components/worldChart.vue';
// import { mapGetters, mapMutations, mapActions } from "vuex";

// import { errorToaster } from "../../shared/service/ErrorHandler.js"
export default {
  components: {WorldChart},
  name: "aboutView",
  props: {
  
  },
  data() {
    return {};
  },
  methods: {
     //  VueX
    // ...mapMutations(["increase"]),
    // ...mapActions(["handle"]),
    
  },
  computed: {
    //  ...mapGetters(["count"]),
    allCountriesVuex() {
      return this.$store.state.allCountries;
    },
  },
  created() {},
  mounted() {
    this.$store.dispatch('getAllCountries')
    this.$store.dispatch('getUserCountry')
  },
};
</script>

<style lang="scss" scoped></style>
