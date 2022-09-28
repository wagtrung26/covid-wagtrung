<!-- eslint-disable no-unused-vars -->
<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <helloWorld
      :yourCountry="yourCountry"
      :allCountries ="allCountries"
    />
  </div>

</template>

<script>
// @ is an alias to /src
import helloWorld from "@/components/HelloWorld.vue";
import * as api from "@/api";

export default {
  name: "CountryView",
  components: {
    helloWorld,
  },

  data() {
    return {
      yourCountry: {},
      allCountries: [],
    };
  },

  methods: {
    getYourCountry() {
      api
        .yourCountry()
        .then((data) => {
          this.yourCountry.name = data.countryName;
          this.yourCountry.code = data.countryCode;
          this.yourCountry.continent = data.continentName;
          this.yourCountry.ip = data.request;
          console.log(data.request);
          console.log(this.yourCountry);
        })
        .catch((error) => console.log("yourCountry issue: ", error));
    },

    getAllCountries() {
      api
        .getAllCountries()
        .then((res) => {
          // console.log(res);
          // eslint-disable-next-line no-unused-vars
          let rawArrayCountries = res.data;
          let filteredArrayCountries = rawArrayCountries.map((countryItem) => {
            return {
              name: countryItem.country,
              code: countryItem.countryInfo.iso2,
              flag: countryItem.countryInfo.flag,
              ...countryItem,
            };
          })
          
          this.allCountries = filteredArrayCountries
          ;
          console.log(filteredArrayCountries);

        })
        .catch((error) => console.log("yourCountry issue: ", error));
    },
  },

  computed: {
    // name() {
    //   return this.data
    // }
  },

  created() {
    // get user country based on browser IP, at the beginning state
    this.getYourCountry();
    this.getAllCountries();
    
  },
};
</script>
