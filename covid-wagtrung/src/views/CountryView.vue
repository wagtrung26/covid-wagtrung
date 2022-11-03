<!-- eslint-disable no-unused-vars -->
<template>
  <!-- <p>{{ this.viewCountry }}</p> -->

  <div class="w-full">
    <div
      class="relative w-full h-96 bg-gradient-to-tr from-indigo-900 via-slate-800 to-blue-600 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-700 z-0"
      v-show="!loading"
    ></div>
    <!-- ON LOAD Skelaton -->
    <div class="mx-auto px-20 pt-20" v-show="loading">
      <div class="">
        <div class="flex justify-center space-x-8">
          <a-skeleton-image size="large" />
          <a-skeleton
            active
            size="large"
            :paragraph="{ rows: 2 }"
            shape="round"
            class="w-64"
          />
        </div>
        <div class="flex justify-center" style="margin-bottom: 20px">
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
      <a-skeleton avatar active :paragraph="{ rows: 4 }" />
    </div>

    <!-- ON LOAD MODAL - DETECT USER COUNTRY -->
    <div>
      <a-modal v-model:visible="visible" @ok="handleOk">
        <a-result status="success" title="" style="padding: 20px 0px">
          <template #extra>
            <div>
              <p>DETECT NATION BASED ON USER'S IP ADDRESS</p>
              <div class="flex items-center justify-center">
                <img
                  style="margin-right: 16px"
                  :src="this.viewCountry.flag"
                  alt=""
                  width="70"
                />
                <h1 class="text-6xl font-bold leading-relaxed">
                  {{ yourCountry.countryName }}
                </h1>
              </div>

              <p class="text-xl uppercase">
                IP: {{ yourCountry.request }} - {{ yourCountry.continentName }}
              </p>

              <!-- <h2>
              {{ yourCountry.continentName }} - Code:
              {{ yourCountry.continentCode }}
            </h2>  -->
            </div>
          </template>
        </a-result>
      </a-modal>
    </div>

    <div class="container space-y-14 mx-auto" v-show="!loading">
      <!-- 1 STAT HIGHLIGHT -->
      <div class="relative -mt-64 z-10 mb-12">
        <statCard
          :allCountries="allCountries"
          :viewCountry="viewCountry"
          :dailyCaseArrayValues="dailyCaseArrayValues"
          :dailyRecoverArrayValues="dailyRecoverArrayValues"
          :dailyDeathArrayValues="dailyDeathArrayValues"
          @countryClickComp="countryClick"
        />
      </div>
      <!--2 DAILY -->
      <wrap
        title="Daily Statistic"
        :subBot="`Everyday Cases in ${this.viewCountry.name}`"
        subTop="soligauge, Column-line, Stack"
      >
        <!-- DAILY card yesterday-->
        <div class="flex mb-8 -mt-8 bg-slate-50 space-x-8 p-12 rounded-2xl">
          <!-- card -->
          <card
            :percent="
              subBot(
                dailyCaseArrayValues[dailyCaseArrayValues.length - 1],
                dailyCaseArrayValues[dailyCaseArrayValues.length - 2]
              ).per
            "
            subTop="Cases yesterday"
            :subBot="
              subBot(
                dailyCaseArrayValues[dailyCaseArrayValues.length - 1],
                dailyCaseArrayValues[dailyCaseArrayValues.length - 2]
              ).val
            "
            :title="dailyCaseArrayValues[dailyCaseArrayValues.length - 1]"
          />

          <card
            :percent="
              subBot(
                dailyDeathArrayValues[dailyDeathArrayValues.length - 1],
                dailyDeathArrayValues[dailyDeathArrayValues.length - 2]
              ).per
            "
            subTop="Deaths yesterday"
            :subBot="
              subBot(
                dailyDeathArrayValues[dailyDeathArrayValues.length - 1],
                dailyDeathArrayValues[dailyDeathArrayValues.length - 2]
              ).val
            "
            :title="dailyDeathArrayValues[dailyDeathArrayValues.length - 1]"
          />

          <card
            :percent="
              subBot(
                dailyRecoverArrayValues[dailyRecoverArrayValues.length - 1],
                dailyRecoverArrayValues[dailyRecoverArrayValues.length - 2]
              ).per
            "
            subTop="Recovers yesterday"
            :subBot="
              subBot(
                dailyRecoverArrayValues[dailyRecoverArrayValues.length - 1],
                dailyRecoverArrayValues[dailyRecoverArrayValues.length - 2]
              ).val
            "
            :title="dailyRecoverArrayValues[dailyRecoverArrayValues.length - 1]"
          />
        </div>

        <!-- daily colums + stack -->
        <div
          class="w-full shadow-2xl shadow-slate-200/70 px-8 py-2 rounded-2xl mb-12"
        >
          <a-tabs v-model:activeKey="activeKey" size="large">
            <a-tab-pane key="1" tab="Column Chart">
              <dailyChart
                class="mt-4"
                :dailyCaseArrayValues="dailyCaseArrayValues"
                :dailyActiveArrayValues="dailyActiveArrayValues"
                :dailyRecoverArrayValues="dailyRecoverArrayValues"
                :dailyDeathArrayValues="dailyDeathArrayValues"
                :dates="dates"
                @type="type"
              />
            </a-tab-pane>
            <a-tab-pane key="2" tab="Distribution Chart">
              <stackChart
                class="mt-4"
                :dailyActiveArrayValues="dailyActiveArrayValues"
                :dailyRecoverArrayValues="dailyRecoverArrayValues"
                :dailyDeathArrayValues="dailyDeathArrayValues"
                :dailyVaccineArrayValues="dailyVaccineArrayValues"
                :dates="dates"
              />
            </a-tab-pane>
          </a-tabs>
        </div>

        <!-- Daily Map + Highlight -->
        <div class="">
          <div class="flex space-x-8">
            <div class="w-5/12 h-full bg-slate-50 px-8 py-2 rounded-2xl">
              <countryMap :viewCountry="viewCountry" />
            </div>
            <div class="w-7/12 flex-1">
              <dailyHighlight
                :dailyCaseArrayValues="dailyCaseArrayValues"
                :dailyRecoverArrayValues="dailyRecoverArrayValues"
                :dailyDeathArrayValues="dailyDeathArrayValues"
                :viewCountry="viewCountry"
                :dates="dates"
              />
            </div>
          </div>
        </div>
      </wrap>

      <!--3 Vaccine -->
      <wrap
        title="Vaccine"
        :subBot="`Daily Vaccines in ${this.viewCountry.name}`"
        subTop="Area, Spline"
      >
        <div class="flex flex-wrap space-x-8">
          <div class="w-3/12">
            <vachighlight
              :dailyVaccineArrayValues="dailyVaccineArrayValues"
              :dates="dates"
            />
          </div>
          <div class="w-9/12 flex-1">
            <vaccine-chart
              :dailyCaseArrayValues="dailyCaseArrayValues"
              :dailyDeathArrayValues="dailyDeathArrayValues"
              :dailyVaccineArrayValues="dailyVaccineArrayValues"
              :dates="dates"
            />
          </div>
        </div>

        <!-- Vac efficiency -->
        <div class="border-t-2 border-slate-100 my-8"></div>
        <p
          class="text-left text-sm tracking-wider font-semibold text-slate-500 uppercase mb-3"
        >
          Timline
        </p>
        <h1
          class="text-left text-5xl font-semibold tracking-tight text-slate-900"
        >
          Vaccine Efficiency
        </h1>
        <h2 class="text-left text-base text-slate-500 mt-2 mb-8">
          Population full dose of Vaccination
        </h2>

        <div class="w-full p-8 bg-slate-50 space-y-8 rounded-2xl">
          <div v-for="(item, index) in v" :key="index">
            <div class="w-full" v-if="index < this.v.length - 1">
              <div class="flex items-center flex-start mb-5">
                <p
                  class="text-2xl leading-none font-semibold text-white bg-violet-600 py-2 px-4 rounded-lg mr-4"
                >
                  {{ index + 1 }}
                </p>
                <span
                  class="text-2xl leading-none font-semibold text-slate-900"
                >
                  Full Vaccination at:
                  {{
                    this.dates[
                      this.vaccineArrayValues.indexOf(this.v[index + 1])
                    ]
                  }}</span
                >
              </div>
              <div class="flex space-x-8">
                <mixLineChart
                  class="w-1/2"
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
                <mixLineChart
                  class="w-1/2"
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
            </div>

            <div class="w-full" v-else>
              <div class="flex items-center flex-start mb-5">
                <span class="text-2xl leading-none font-semibold text-slate-900"
                  >Up to Now
                </span>
              </div>
              <div class="flex space-x-8">
                <mixLineChart
                  class="w-1/2"
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
                <mixLineChart
                  class="w-1/2"
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
        </div>
      </wrap>

      <!--4 TOTAL -->
      <wrap
        title="Total Statistic"
        :subBot="` ${this.viewCountry.name}'s cases from the beginning up to now`"
        subTop="Tracking Timeline, Map"
      >
        <div class="flex flex-wrap items-center space-x-4">
          <div class="w-3/12">
            <div class="c" v-show="selectedType != 'death'">
              <h2>Cases every 1 Million</h2>
              <solidgaugeChart :val="viewCountry.casesPerOneMillion" />
              <p>{{ viewCountry.name }} Population</p>
              <h2>{{ viewCountry.population }}</h2>
            </div>
          </div>
          <div class="w-9/12 flex-1">
            <lineChart
              :caseArrayValues="caseArrayValues"
              :deathArrayValues="deathArrayValues"
              :recoverArrayValues="recoverArrayValues"
              :dates="dates"
              :vaccineArrayValues="vaccineArrayValues"
            ></lineChart>
          </div>
        </div>
      </wrap>

      <!--5 CONTINENT -->
      <wrap
        title="Continent"
        subBot="Visualization in this Nation's Continent"
        subTop="Donut, Column, Table"
      >
        <countries-in-continent
          :continentArray="continentArray"
          :viewCountry="viewCountry"
          :continentTotal="continentTotal"
        />
      </wrap>
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
import wrap from "@/components/comp/wrap.vue";
import card from "@/components/comp/card.vue";

export default {
  name: "CountryView",
  components: {
    wrap,
    card,
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
      activeKey: "1",
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
    subBot(num1, num2) {
      var rs = num1 - num2;
      let absrs = Math.abs(rs);
      let per = Math.floor((absrs * 100) / Math.max(num1, num2));
      if (per) {
        return {
          val: rs,
          per: per,
        };
      } else {
        return {
          val: rs,
          per: 0,
        };
      }
    },
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
