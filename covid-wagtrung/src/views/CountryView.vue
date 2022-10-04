<!-- eslint-disable no-unused-vars -->
<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <div class="yourCountry">
      <p>
        You are live in: {{ yourCountry.countryName }} - IP:
        {{ yourCountry.request }}
      </p>
      <p>
        Your Continent: {{ yourCountry.continentName }} - Continent Code:
        {{ yourCountry.continentCode }}
      </p>
    </div>

    <statCard
      :allCountries="allCountries"
      :viewCountry="viewCountry"
      :dailyCaseArrayValues="dailyCaseArrayValues"
      :dailyRecoverArrayValues="dailyRecoverArrayValues"
      :dailyDeathArrayValues="dailyDeathArrayValues"
      @countryClickComp="countryClick"
    />
    <countryMap />

    <lineChart
      :caseArrayValues="caseArrayValues"
      :deathArrayValues="deathArrayValues"
      :recoverArrayValues="recoverArrayValues"
      :dates="dates"
    ></lineChart>

    <dailyChart
      :dailyCaseArrayValues="dailyCaseArrayValues"
      :dailyRecoverArrayValues="dailyRecoverArrayValues"
      :dailyDeathArrayValues="dailyDeathArrayValues"
      :dates="dates"
    ></dailyChart>

    <countries-in-continent
      :continentArray="continentArray"
      :viewCountry="viewCountry"
      :continentTotal="continentTotal"
  
    />
  </div>
</template>

<script>
// @ is an alias to /src
import * as api from "@/api";
import statCard from "@/components/statCard.vue";
import lineChart from "@/components/lineChart.vue";
import dailyChart from "@/components/dailyChart.vue";
import countriesInContinent from "@/components/countriesInContinent.vue";
import countryMap from '@/components/countryMap.vue';

export default {
  name: "CountryView",
  components: {
    statCard,
    lineChart,
    dailyChart,
    countriesInContinent,
    countryMap,
  },

  data() {
    return {
      allCountries: [],
      yourCountry: {},
      viewCountry: {},
      caseArrayValues: [],
      deathArrayValues: [],
      recoverArrayValues: [],
      dailyCaseArrayValues: [],
      dailyRecoverArrayValues: [],
      dailyDeathArrayValues: [],
      dates: [],
      continentArray: [],
      continentTotal: {},
      
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
        // console.log(" 1 this.allCountries ");
      } catch (e) {
        console.log(" allCountries err ", e);
      }
    },
    async getUserCountry() {
      // 2. get user country based on browser IP, at the beginning state
      try {
        this.yourCountry = await api.yourCountry();
        // console.log("2 this.yourCountry.code  ", this.yourCountry.countryCode);
      } catch (error) {
        console.log(" error yourCountry.code ", error);
      }
    },
    getHistoricalCountry() {
      api
        .getHistoricalCountry(this.viewCountry.code)
        .then((res) => {
          let listTimeline = res.data.timeline;
          //yAxis
          this.caseArrayValues = Object.values(listTimeline.cases);
          this.deathArrayValues = Object.values(listTimeline.deaths);
          this.recoverArrayValues = Object.values(listTimeline.recovered);

          //xAsis
          this.dates = Object.keys(listTimeline.cases);
          this.dailyCaseArrayValues = this.dailyArrayValues(
            this.caseArrayValues
          );
          this.dailyDeathArrayValues = this.dailyArrayValues(
            this.deathArrayValues
          );
          this.dailyRecoverArrayValues = this.dailyArrayValues(
            this.recoverArrayValues
          );
        })
        .catch((e) => console.log(" something ", e));
    },
    countryClick(countryCode) {
      try {
        if (countryCode) {
          var country = this.allCountries.find((i) => i.code === countryCode);
          this.viewCountry = country;
          this.getHistoricalCountry();
          this.countriesInContinent(this.viewCountry.continent);
          this.getTotalContinent(this.viewCountry.continent);
        }
        this.vModelCountry = "";
      } catch (error) {
        console.log("countryClick err", error);
      }
    },
    countriesInContinent() {
      this.continentArray = [];

      this.allCountries.forEach((i) => {
        if (i.continent == this.viewCountry.continent) {
          this.continentArray.push(i);
        }
      });
    },
    dailyArrayValues(mockArray) {
      let chartDataY = [];
      let lastData;
      mockArray.map((item) => {
        if (lastData) {
          let newDataY = item - lastData;
          chartDataY.push(newDataY);
        }
        lastData = item;
      });

      return chartDataY;
    },
    getTotalContinent() {
      api
        .getTotalContinent(this.viewCountry.continent)
        .then((res) => {
          this.continentTotal = res.data;
          // console.log(" this.continentTotal  ", this.continentTotal )
        })
        .catch((e) => console.log(" getTotalContinent err ", e));
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
    console.log(" 1. allCountries ");
    // 2. get user country Code, based on browser IP
    await this.getUserCountry();
    console.log(" 2. yourCountry ");

    // 3. check country to render at first
    this.countryClick(this.yourCountry.countryCode);
    console.log(" 3. ViewCountry ");

    //4. get Historical of cases, recovered, deaths array of a specific country
    await this.getHistoricalCountry();
    console.log(" 4. Historical ViewCountry ");

    //5.continent
    this.countriesInContinent();
    console.log(" 5. Continent ");

    await this.getTotalContinent();
    console.log(" 6. Total Continent ");

    // this.continentChart();
  },
};
</script>

<style scoped>
.yourCountry {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 20px;
  border: 1px solid rgb(224, 224, 224);
  text-align: left;
}
</style>
