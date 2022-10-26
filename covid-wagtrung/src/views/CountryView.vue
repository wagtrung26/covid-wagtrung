<!-- eslint-disable no-unused-vars -->
<template>
  <!-- <p>{{ this.viewCountry }}</p> -->
  <div class="home containerF">
    <!-- MODAL - DETECT USER COUNTRY -->

    <div class="mx-30 containerF" v-show="loading">
      <div>
        <div class="flexC">
          <a-skeleton-image
            size="large"
            style="margin-right: 30px"
          />
          <a-skeleton
            active
            size="large"
            :paragraph="{ rows: 2 }"
            shape="round"
            style="width: 500px"
          />
        </div>
        <div class="flexC containerF " style="margin-bottom: 20px">
          <a-skeleton
            active
            shape="round"
            :paragraph="{ rows: 3 }"
            style="width: 300px; margin-right: 30px"
          />
          <a-skeleton
            active
            shape="round"
            :paragraph="{ rows: 3 }"
            style="width: 300px; margin-right: 30px"
          />

          <a-skeleton
            active
            shape="round"
            :paragraph="{ rows: 3 }"
            style="width: 300px"
          />
        </div>
      </div>
      <a-spin
        :tip="'WagTrung-Covid Loading ' + this.viewCountry.name"
        size="default"
     
      >
       </a-spin>
        <a-skeleton avatar active :paragraph="{ rows: 4}" />
    </div>

    <div>
      <a-modal v-model:visible="visible" @ok="handleOk">
        <a-result status="success" title="" style="padding: 20px 0px">
          <template #extra>
            <div>
              <p>DETECT NATION BASED ON USER'S IP ADDRESS</p>
              <h1 class="textXl my-0">
                <img
                  style="margin-right: 16px"
                  :src="this.viewCountry.flag"
                  alt=""
                  width="70"
                />
                <strong>{{ yourCountry.countryName }} </strong>
              </h1>

              <h1 class="mb0">
                IP: {{ yourCountry.request }} - {{ yourCountry.continentName }}
              </h1>

              <!-- <h2>
              {{ yourCountry.continentName }} - Code:
              {{ yourCountry.continentCode }}
            </h2>  -->
            </div>
          </template>
        </a-result>
      </a-modal>
    </div>

    <!-- 1 STAT HIGHLIGHT -->
    <div class="countryVIew" v-show="!loading">
      <statCard
        :allCountries="allCountries"
        :viewCountry="viewCountry"
        :dailyCaseArrayValues="dailyCaseArrayValues"
        :dailyRecoverArrayValues="dailyRecoverArrayValues"
        :dailyDeathArrayValues="dailyDeathArrayValues"
        @countryClickComp="countryClick"
      />

      <!--2 DAILY -->
      <h1 class="pl textXl mb0 textLeft">Daily Stat</h1>
      <h3 class="pl textLeft mbL">
        New Cases, New Deaths, New Recovered Cases in {{ viewCountry.name }}
      </h3>

      <div class="flex mx-30">
        <div class="flex3">
          <div class="c" v-show="selectedType != 'death'">
            <h2>Cases every 1 Million</h2>
            <solidgaugeChart :val="viewCountry.casesPerOneMillion" />
          </div>

          <div class="c" v-show="selectedType == 'death'">
            <h2>Deaths every 1 Million</h2>
            <solidgaugeChart :val="viewCountry.deathsPerOneMillion" />
          </div>
          <p>{{ viewCountry.name }} Population</p>
          <h2>{{ viewCountry.population }}</h2>
        </div>

        <div class="flex9">
          <dailyChart
            :dailyCaseArrayValues="dailyCaseArrayValues"
            :dailyActiveArrayValues="dailyActiveArrayValues"
            :dailyRecoverArrayValues="dailyRecoverArrayValues"
            :dailyDeathArrayValues="dailyDeathArrayValues"
            :dates="dates"
            @type="type"
          ></dailyChart>
        </div>
      </div>

      <div class="flex">
        <div class="flex3">
          <dailyHighlight
            :dailyCaseArrayValues="dailyCaseArrayValues"
            :dailyRecoverArrayValues="dailyRecoverArrayValues"
            :dailyDeathArrayValues="dailyDeathArrayValues"
            :viewCountry="viewCountry"
            :dates="dates"
          />
        </div>
        <div class="flex9">
          <stackChart
            :dailyActiveArrayValues="dailyActiveArrayValues"
            :dailyRecoverArrayValues="dailyRecoverArrayValues"
            :dailyDeathArrayValues="dailyDeathArrayValues"
            :dailyVaccineArrayValues="dailyVaccineArrayValues"
            :dates="dates"
          ></stackChart>
        </div>
      </div>

      <!--3 Vaccine -->
      <h1 class="pl textXl mb0 textLeft">Vaccine</h1>
      <h3 class="pl textLeft">Daily Vaccines in {{ viewCountry.name }}</h3>

      <div class="flex">
        <div class="flex3">
          <vachighlight
            :dailyVaccineArrayValues="dailyVaccineArrayValues"
            :dates="dates"
          />
        </div>
        <div class="flex9">
          <vaccine-chart
            :dailyCaseArrayValues="dailyCaseArrayValues"
            :dailyDeathArrayValues="dailyDeathArrayValues"
            :dailyVaccineArrayValues="dailyVaccineArrayValues"
            :dates="dates"
          />
        </div>
      </div>

      <h1 class="pl textXl mb0 textLeft">Vaccine Efficiency</h1>
      <h2 class="pl textLeft">
        Population full dose of Vaccinate - Population:
        {{ this.viewCountry.population }}
      </h2>

      <div v-for="(item, index) in v" :key="index">
        <div class="flex">
          <div class="flex1 mr" v-if="index < this.v.length - 1">
            <h1 class="textLeft">
              full at
              {{
                this.dates[this.vaccineArrayValues.indexOf(this.v[index + 1])]
              }}
            </h1>
            <mixLineChart
              :y="
                this.dailyDeathArrayValues.slice(
                  this.vaccineArrayValues.indexOf(this.v[index]),
                  this.vaccineArrayValues.indexOf(this.v[index + 1])
                )
              "
              :x="
                this.dates.slice(
                  this.vaccineArrayValues.indexOf(this.v[index]) + 1,
                  this.vaccineArrayValues.indexOf(this.v[index + 1]) + 1
                )
              "
            />
          </div>

          <div class="flex1 mr" v-else>
            <h1 class="textLeft">Up to Now</h1>
            <mixLineChart
              :y="
                this.dailyDeathArrayValues.slice(
                  this.vaccineArrayValues.indexOf(this.v[index])
                )
              "
              :x="
                this.dates.slice(
                  this.vaccineArrayValues.indexOf(this.v[index]) + 1
                )
              "
            />
          </div>
          <!-- CASES VACCINES Eficiency -->
          <div class="flex1 mr" v-if="index < this.v.length - 1">
            <mixLineChart
              :y="
                this.dailyCaseArrayValues.slice(
                  this.vaccineArrayValues.indexOf(this.v[index]),
                  this.vaccineArrayValues.indexOf(this.v[index + 1])
                )
              "
              :x="
                this.dates.slice(
                  this.vaccineArrayValues.indexOf(this.v[index]) + 1,
                  this.vaccineArrayValues.indexOf(this.v[index + 1]) + 1
                )
              "
              type="cases"
            />
          </div>
          <div class="flex1 mr" v-else>
            <mixLineChart
              :y="
                this.dailyCaseArrayValues.slice(
                  this.vaccineArrayValues.indexOf(this.v[index])
                )
              "
              :x="
                this.dates.slice(
                  this.vaccineArrayValues.indexOf(this.v[index]) + 1
                )
              "
              type="cases"
            />
          </div>
        </div>
      </div>

      <!--4 TOTAL -->
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

      <!--5 CONTINENT -->
      <countries-in-continent
        :continentArray="continentArray"
        :viewCountry="viewCountry"
        :continentTotal="continentTotal"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import * as api from "@/api";
import statCard from "@/components/statCard.vue";
import lineChart from "@/components/chart/lineChart.vue";
import dailyChart from "@/components/chart/dailyChart.vue";
import countriesInContinent from "@/components/countriesInContinent.vue";
import countryMap from "@/components/countryMap.vue";
import stackChart from "@/components/chart/stackChart.vue";
import VaccineChart from "@/components/VaccineChart.vue";
import dailyHighlight from "@/components/dailyHighlight.vue";
import vachighlight from "@/components/vachighlight.vue";
import solidgaugeChart from "@/components/chart/solidgaugeChart.vue";
import mixLineChart from "@/components/chart/mixLineChart.vue";

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
    vachighlight,
    solidgaugeChart,
    mixLineChart,
  },

  data() {
    return {
      loading: false,
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
      visible: true,
      selectedType: "cases",

      // v1: "",
      v: [],
    };
  },

  methods: {
    // Normal Method
    type(x) {
      this.selectedType = x;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
    vacTrend() {
      let totalVac =
        this.vaccineArrayValues[this.vaccineArrayValues.length - 1];
      let popu = this.viewCountry.population;
      let timesFullVac = Math.floor(totalVac / popu);
      this.v = [];
      for (let i = 0; i <= timesFullVac; i++) {
        const x = this.vaccineArrayValues.find((k) => k >= popu * i);
        this.v.push(x);
      }

      // this.v1 = this.vaccineArrayValues.indexOf(v[0]);

      // console.log(" timesFullVac", timesFullVac);
      // console.log(" v", this.v);
      // console.log(" vacTrend popu", this.viewCountry.population);
      // console.log(" vacTrend x ", x);
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
        // console.log("2 this.yourCountry  ", this.yourCountry);
      } catch (error) {
        console.log(" error yourCountry.code ", error);
      }
    },
    countryClick(countryCode = "vn") {
      this.loading = true;
      var country = this.allCountries.find((i) => i.code === countryCode);
      this.viewCountry = country;
      // console.log(" 3 this.viewCountry ", this.viewCountry);

      this.getHistoricalCountry();
      // console.log(" 4 getHistoricalCountry ");

      this.countriesInContinent(this.viewCountry.continent);
      // console.log(" 5.1 countries Continent ");

      this.getTotalContinent(this.viewCountry.continent);
      // console.log(" 5.2 total Continent ");
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
          // console.log(" this.activeArrayValues ", this.activeArrayValues);
          this.dailyActiveArrayValues = this.dailyArrayValues(
            this.activeArrayValues
          );
          // console.log(" dailyActiveArrayValues ", this.dailyActiveArrayValues);

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
          this.vacTrend();
        })
        .catch((e) => console.log(" getHistoricalCountryVaccine ", e));
    },
    countriesInContinent() {
      this.continentArray = [];

      this.allCountries.forEach((i) => {
        if (i.continent == this.viewCountry.continent) {
          this.continentArray.push(i);
        }
      });
    },
    getTotalContinent() {
      api
        .getTotalContinent(this.viewCountry.continent)
        .then((res) => {
          this.continentTotal = res.data;
          this.loading = false;
          // console.log(" this.continentTotal  ", this.continentTotal )
        })
        .catch((e) => console.log(" getTotalContinent err ", e));
    },
  },

  computed: {},

  created() {
    // this.getHistoricalCountry();
    // this.countriesInContinent();
    // this.getTotalContinent();
  },
  mounted() {
    // Asyncronous 1.then 2.async-await
    this.getAllCountries().then(() => {
      this.getUserCountry().then(() => {
        this.countryClick(this.yourCountry.countryCode);
      });
    });
  },
};
</script>

<style scoped></style>
