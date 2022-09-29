<!-- eslint-disable no-unused-vars -->
<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <helloWorld :allCountries="allCountries" />

    <lineChart />
  </div>
</template>

<script>
// @ is an alias to /src
import * as api from "@/api";
import helloWorld from "@/components/HelloWorld.vue";
import lineChart from "@/components/lineChart.vue";

export default {
  name: "CountryView",
  components: {
    helloWorld,
    lineChart,
  },

  data() {
    return {
      allCountries: [],
    };
  },

  methods: {
  
    
  },

  computed: {
    // name() {
    //   return this.data
    // }
  },

  async created() {
    // get user country based on browser IP, at the beginning state
    try {
        let ArrayCountries = await api.getAllCountries();
        let rawArrayCountries = ArrayCountries.data;
        let filteredArrayCountries = rawArrayCountries.map((countryItem) => {
          return {
            name: countryItem.country,
            code: countryItem.countryInfo.iso2,
            flag: countryItem.countryInfo.flag,
            ...countryItem,
          };
        });

        this.allCountries = filteredArrayCountries;
        console.log(" 1 this.allCountries ",this.allCountries)
      } catch (e) {
        console.log(" allCountries err ", e);
      }
  },
};
</script>
