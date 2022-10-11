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
    <!-- <p>vaccincoverage: {{ vacCover }}</p> -->

    <!-- DAILY -->

    <h1 class="pl textXl mb0 textLeft">Daily Stat</h1>
    <h3 class="pl textLeft mbL">
      New Cases, New Deaths, New Recovered Cases in {{ viewCountry.name }}
    </h3>

    <dailyChart
      :dailyCaseArrayValues="dailyCaseArrayValues"
      :dailyActiveArrayValues="dailyActiveArrayValues"
      :dailyRecoverArrayValues="dailyRecoverArrayValues"
      :dailyDeathArrayValues="dailyDeathArrayValues"
      :dates="dates"
    ></dailyChart>

    <div class="flex">
      <div class="flex5">
        <dailyHighlight
          :dailyCaseArrayValues="dailyCaseArrayValues"
          :dailyRecoverArrayValues="dailyRecoverArrayValues"
          :dailyDeathArrayValues="dailyDeathArrayValues"
          :dailyVaccineArrayValues="dailyVaccineArrayValues"
          :dates="dates"
        />
      </div>
      <div class="flex7">
        <stackChart
          :dailyActiveArrayValues="dailyActiveArrayValues"
          :dailyRecoverArrayValues="dailyRecoverArrayValues"
          :dailyDeathArrayValues="dailyDeathArrayValues"
          :dailyVaccineArrayValues="dailyVaccineArrayValues"
          :dates="dates"
        ></stackChart>
      </div>
    </div>

    <!-- <p>{{ viewCountry }}</p> -->

    <!-- Vaccine -->
    <h1 class="pl textXl mb0 textLeft">Vaccine</h1>
    <h3 class="pl textLeft">Daily Vaccines in {{ viewCountry.name }}</h3>

    <vaccine-chart
      :dailyDeathArrayValues="dailyDeathArrayValues"
      :dailyCaseArrayValues="dailyCaseArrayValues"
      :dailyVaccineArrayValues="dailyVaccineArrayValues"
      :dates="dates"
    />

    <!-- TOTAL -->
    <h1 class="pl textXl mb0 textLeft">Total Stat</h1>
    <h3 class="pl textLeft">
      Total cases from the beginning up to now in {{ viewCountry.name }}
    </h3>

    <div class="flex">
      <div class="flex5">
        <countryMap :viewCountry="viewCountry" />
      </div>
      <div class="flex7">
        <lineChart
          :caseArrayValues="caseArrayValues"
          :deathArrayValues="deathArrayValues"
          :recoverArrayValues="recoverArrayValues"
          :dates="dates"
          :vaccineArrayValues="vaccineArrayValues"
        ></lineChart>
      </div>
    </div>

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
import countryMap from "@/components/countryMap.vue";
import stackChart from "@/components/stackChart.vue";
import VaccineChart from "@/components/VaccineChart.vue";
import dailyHighlight from '@/components/dailyHighlight.vue';

export default {
  name: "CountryView",
  components: {
    statCard,
    lineChart,
    dailyChart,
    countriesInContinent,
    countryMap,
    stackChart,
    VaccineChart,
    dailyHighlight,
  },

  data() {
    return {
      allCountries: [],
      yourCountry: {},
      viewCountry: {},
      caseArrayValues: [],
      deathArrayValues: [],
      recoverArrayValues: [],
      vaccineArrayValues: [],
      activeArrayValues: [],

      // activeArrayValues: [],
      dailyCaseArrayValues: [],
      dailyRecoverArrayValues: [],
      dailyDeathArrayValues: [],
      dailyVaccineArrayValues: [],
      dailyActiveArrayValues: [],

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
          // console.log(" listTimeline ",res.data)

          //TOTAL HISTORY
          //xAsis
          this.dates = Object.keys(listTimeline.deaths);
          //yAxis
          this.caseArrayValues = Object.values(listTimeline.cases);
          this.recoverArrayValues = Object.values(listTimeline.recovered);
          this.deathArrayValues = Object.values(listTimeline.deaths);
          //create ACTIVE TOTAL
          this.activeArrayValues = [];
          this.caseArrayValues.forEach((i, index) => {
            let active =
              i - this.deathArrayValues[index] - this.deathArrayValues[index];
            this.activeArrayValues.push(active);
          });
          console.log(" this.activeArrayValues ", this.activeArrayValues);
          this.dailyActiveArrayValues = this.dailyArrayValues(
            this.activeArrayValues
          );
          console.log(" dailyActiveArrayValues ", this.dailyActiveArrayValues);

          //DAILY CASE HISTORY - total[last] - total[last-1]
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
        .catch((e) => console.log(" getHistoricalCountry ", e));

      api
        .getHistoricalCountryVaccine(this.viewCountry.code)
        .then((res) => {
      
          let listTimeline = res.data.timeline;
          let newVaccineArrayValues = Object.values(listTimeline);
     

          let n = this.dates.length - newVaccineArrayValues.length;
          for (let i = 0; i < n; i++) {
            newVaccineArrayValues.unshift(0);
          }
              
          this.vaccineArrayValues = newVaccineArrayValues;

          this.dailyVaccineArrayValues = this.dailyArrayValues(
            newVaccineArrayValues
          );
          console.log("  this.dailyVaccineArrayValues  ", this.dailyVaccineArrayValues )
        })
        .catch((e) => console.log(" getHistoricalCountryVaccine ", e));
    },
    countryClick(countryCode = "vn") {
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
      mockArray.forEach((item) => {
        if (lastData >= 0) {
          let newDataY = Math.abs(item - lastData);
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
    vacCover() {
      let len = this.vaccineArrayValues.length;
      let re = this.vaccineArrayValues[len - 1] / this.viewCountry.population;
      if (re >= 1) {
        return 100;
      } else {
        return re;
      }
      // console.log(" this.vaccineArrayValues[len-1]  ", this.vaccineArrayValues[len-1] )
    },
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
