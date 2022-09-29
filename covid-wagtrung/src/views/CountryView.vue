<!-- eslint-disable no-unused-vars -->
<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <statCard
      :allCountries="allCountries"
      :yourCountryCode="yourCountryCode"
      :viewCountry="viewCountry"
      @countryClickComp="countryClick"
    />

    <lineChart ></lineChart>
  </div>
</template>

<script>
// @ is an alias to /src
import * as api from "@/api";
import statCard from "@/components/statCard.vue";
import lineChart from "@/components/lineChart.vue";

export default {
  name: "CountryView",
  components: {
    statCard,
    lineChart,
  },

  data() {
    return {
      allCountries: [],
      yourCountryCode: "",
      viewCountry: {},
    };
  },

  methods: {
    countryClick(countryCode) {
      try {
        if (countryCode) {
          var country = this.allCountries.find((i) => i.code === countryCode);
          this.viewCountry = country;
        }
        this.vModelCountry = "";
      } catch (error) {
        console.log("countryClick err", error);
      }
    },
  },

  computed: {
    // name() {
    //   return this.data
    // }
  },

  async created() {

    // get All countries
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
      console.log(" 1 this.allCountries ");
    } catch (e) {
      console.log(" allCountries err ", e);
    }

    // get user country based on browser IP, at the beginning state
    try {
      let yourCountry = await api.yourCountry();
      this.yourCountryCode = yourCountry.countryCode;
      console.log("2 this.yourCountryCode  ", this.yourCountryCode);
    } catch (error) {
      console.log(" error yourCountryCode ", error);
    }

    // check country to render
    if (this.yourCountryCode) {
      this.countryClick(this.yourCountryCode);
      console.log(" 3 check Countrycode to render");
    }
  },
};
</script>
