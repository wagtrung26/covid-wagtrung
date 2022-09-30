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

    <lineChart
      :caseArrayValues="caseArrayValues"
      :deathArrayValues="deathArrayValues"
      :recoverArrayValues="recoverArrayValues"
      :dates="dates"
    ></lineChart>

      <dailyChart
      :dailyCaseArrayValues="dailyCaseArrayValues"
      :dates="dates"
    ></dailyChart>


  </div>
</template>

<script>
// @ is an alias to /src
import * as api from "@/api";
import statCard from "@/components/statCard.vue";
import lineChart from "@/components/lineChart.vue";
import dailyChart from "@/components/dailyChart.vue";

export default {
  name: "CountryView",
  components: {
    statCard,
    lineChart,
    dailyChart,
  },

  data() {
    return {
      allCountries: [],
      yourCountryCode: "",
      viewCountry: {},
      caseArrayValues: [],
      deathArrayValues: [],
      recoverArrayValues: [],
      dailyCaseArrayValues:[],
      dates: [],
    };
  },

  methods: {
    async getAllCountries() {
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
    },
    async getUserCountry() {
      // 2. get user country based on browser IP, at the beginning state
      try {
        let yourCountry = await api.yourCountry();
        this.yourCountryCode = yourCountry.countryCode;
        console.log("2 this.yourCountryCode  ", this.yourCountryCode);
      } catch (error) {
        console.log(" error yourCountryCode ", error);
      }
    },
    getHistoricalCountry() {
      api
        .getHistoricalCountry(this.viewCountry.code)
        .then((res) => {
          let listTimeline = res.data.timeline;
          console.log(" something ", listTimeline);
          //yAxis
          this.caseArrayValues = Object.values(listTimeline.cases);
          this.deathArrayValues = Object.values(listTimeline.deaths);
          this.recoverArrayValues = Object.values(listTimeline.recovered);

          //xAsis
          this.dates = Object.keys(listTimeline.cases);
          this.dailyCaseArrayValues=this.dailyArrayValues()
        })
        .catch((e) => console.log(" something ", e));
    },
    countryClick(countryCode) {
      try {
        if (countryCode) {
          var country = this.allCountries.find((i) => i.code === countryCode);
          this.viewCountry = country;
          this.getHistoricalCountry();
        }
        this.vModelCountry = "";
      } catch (error) {
        console.log("countryClick err", error);
      }
    },
    dailyArrayValues() {
      let chartDataY = [];
      let lastData;
      this.caseArrayValues.map((item) => {

        if (lastData) {
          let newDataY = item - lastData;
          chartDataY.push(newDataY);
        }
        lastData = item;
      });

      return chartDataY
    },
  },

  computed: {
    // name() {
    //   return this.data
    // }
  },

  async created() {
    // 1. get All countries
    await this.getAllCountries();
    // 2. get user country Code, based on browser IP
    await this.getUserCountry();
    // 3. check country to render at first
    this.countryClick(this.yourCountryCode);
    //4. get Historical of cases, recovered, deaths array of a specific country
    await this.getHistoricalCountry();
  },
};
</script>
