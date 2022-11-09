<!-- eslint-disable no-unused-vars -->
<template>
  <!-- <p>{{ this.viewCountry }}</p> -->

  <div class="w-full">
    <div
      class="relative w-full h-96 bg-gradient-to-tr from-indigo-900 via-slate-800 to-blue-600 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-700 z-0"
      v-show="!loading"
    ></div>

    <!-- ON LOAD Skelaton -->
    <div class="m-auto px-20 pt-20 bg-white" v-show="loading">
      <div class="">
        <div class="flex justify-center item-center space-x-4 mb-2">
          <a-skeleton-image size="large" />
          <a-skeleton
            active
            size="large"
            :paragraph="{ rows: 2 }"
            shape="round"
            class="w-96 -mt-3"
          />
        </div>
        <a-spin
          :tip="'WagTrung-Covid Loading...' + this.viewCountry.name"
          size="small"
        >
        </a-spin>
        <div class="flex justify-center mb-8 space-x-8">
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
      <a-skeleton avatar active :paragraph="{ rows: 4 }" />
    </div>

    <!-- ON LOAD MODAL - DETECT USER COUNTRY -->

    <modal title="Your Country" v-if="visible && yourCountry.request">
      <div class="flexCen flex-col mt-10">
        <div class="h-32 w-32 relative">
          <img class="animate-spin" src="@/assets/fav.png" alt="" />
          <span
          class="animate-ping absolute inset-0 h-full w-full rounded-full border-4 border-emerald-200/70 opacity-75"
        ></span>
        </div>
        <div class="flexCen mt-6">
          <img
            style="margin-right: 16px"
            :src="this.viewCountry.flag"
            alt=""
            width="80"
          />
          <h1
            class="text-6xl font-semibold text-slate-900 leading-snug tracking-tight truncate"
          >
            {{ yourCountry.countryName }}
          </h1>
        </div>

        <p
          class="text-2xl uppercase font-semibold text-slate-500 tracking-wide mb-4"
        >
          IP: {{ yourCountry.request }} - {{ yourCountry.continentName }}
        </p>
      </div>
    </modal>

    <selectCountry
      :allCountries="allCountries"
      :viewCountry="viewCountry"
      @searchOff="searchOn = false"
      @countryClickComp="countryClick"
      v-if="searchOn"
    />

    <div class="container space-y-14 mx-auto" v-show="!loading">
      <!-- 1 STAT HIGHLIGHT -->
      <div class="relative -mt-64 z-10 mb-12">
        <statCard
          :viewCountry="viewCountry"
          :dailyCaseArrayValues="dailyCaseArrayValues"
          :dailyRecoverArrayValues="dailyRecoverArrayValues"
          :dailyDeathArrayValues="dailyDeathArrayValues"
          @searchOn="searchOn = true"
        />
      </div>
      <!--2 DAILY -->
      <wrap
        title="Daily Statistic"
        :subBot="`Everyday Cases in ${this.viewCountry.name}`"
        subTop="soligauge, Column-line, Stack"
      >
        <!-- DAILY card yesterday-->
        <div class="-mt-8 bg-slate-50 p-10 rounded-2xl mb-8">
          <div class="flex flex-wrap space-x-8 mb-8">
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
              :title="
                dailyRecoverArrayValues[dailyRecoverArrayValues.length - 1]
              "
            />
          </div>

          <!-- daily colums + stack -->
          <div
            class="w-full bg-white shadow-2xl shadow-slate-200/70 px-8 py-2 rounded-2xl mb-8"
          >
            <h3
              class="text-left my-6 pl-4 border-l-8 border-blue-500 text-xl font-semibold tracking-tight text-slate-900"
            >
              Everyday Cases and Weekly Average
            </h3>
            <dailyChart
              :dailyCaseArrayValues="dailyCaseArrayValues"
              :dailyActiveArrayValues="dailyActiveArrayValues"
              :dailyRecoverArrayValues="dailyRecoverArrayValues"
              :dailyDeathArrayValues="dailyDeathArrayValues"
              :dates="dates"
            />
          </div>

          <div
            class="w-full bg-white shadow-2xl shadow-slate-200/70 px-8 py-2 rounded-2xl mb-8"
          >
            <h3
              class="text-left my-6 pl-4 border-l-8 border-blue-500 text-xl font-semibold tracking-tight text-slate-900"
            >
              Distribution Factors
            </h3>
            <stackChart
              ref="stack"
              :dailyActiveArrayValues="dailyActiveArrayValues"
              :dailyRecoverArrayValues="dailyRecoverArrayValues"
              :dailyDeathArrayValues="dailyDeathArrayValues"
              :dailyVaccineArrayValues="dailyVaccineArrayValues"
              :dates="dates"
            />
          </div>
          <div
            class="w-full bg-white shadow-2xl shadow-slate-200/70 px-8 py-2 rounded-2xl"
          >
            <h3
              class="text-left my-6 pl-4 border-l-8 border-blue-500 text-xl font-semibold tracking-tight text-slate-900"
            >
              Weekly Cases
            </h3>
            <heatChart :y="heatY" :x="heatX" />
          </div>
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
          Timeline
        </p>
        <h1
          class="text-left text-5xl font-semibold tracking-tight text-slate-900"
        >
          Vaccine Efficiency
        </h1>
        <h2 class="text-left text-base text-slate-500 mt-2 mb-8">
          Population full dose of Vaccination
        </h2>
        <!-- <p class="bg-rose-600 p-4 text-white">đang fix lỗi không hiển thị chart sau khi deploy lên web (local vẫn chạy bình thường)</p> -->

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
                  :y="sliceDeath(index)"
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
        <div class="flex flex-wrap space-x-8">
          <div
            class="w-3/12 h-full bg-white p-4 border-2 border-slate-50 rounded-2xl shadow-2xl shadow-slate-400/20"
          >
            <div v-show="selectedType != 'death'">
              <h3
                class="text-center mb-0 text-xl font-semibold tracking-tight text-slate-900"
              >
                Cases every 1 Million
              </h3>

              <solidgaugeChart :val="viewCountry.casesPerOneMillion" />
            </div>

            <div v-show="selectedType == 'death'">
              <h3
                class="text-center mb-3 text-xl font-semibold tracking-tight text-slate-900"
              >
                Deaths every 1 Million
              </h3>

              <solidgaugeChart :val="viewCountry.deathsPerOneMillion" />
            </div>

            <a-radio-group v-model:value="selectedType" size="large" class="">
              <a-radio-button value="cases">Cases</a-radio-button>
              <a-radio-button value="death">Deaths</a-radio-button>
            </a-radio-group>
            <!-- Population -->

            <div class="w-full p-4 border-t-2 border-slate-50 rounded-2xl">
              <p class="text-sm leading-relaxed font-medium text-slate-500">
                {{ viewCountry.name }} Population
              </p>
              <h2 class="text-3xl font-semibold tracking-tight text-slate-900">
                {{ numF(viewCountry.population) }}
              </h2>
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
      <!-- `${this.viewCountry.continent} (${this.continentArray.length})` -->
      <wrap
        title="Continent"
        subBot="Visualization in this Nation's Continent"
        subTop="Donut, Column, Table"
      >
        <template #right>
          <div class="w-full flex space-x-8 flex-wrap">
            <div
              class="flex-1 text-center bg-white p-4 border-2 border-slate-50 rounded-2xl shadow-2xl shadow-slate-400/20"
            >
              <div
                class="leading-normal text-lg text-slate-500 font-medium uppercase tracking-wider"
              >
                {{ viewCountry.name }}
              </div>
              <div
                class="leading-tight tracking-tight text-5xl font-semibold uppercase bg-clip-text text-transparent bg-gradient-to-tr from-blue-900 to-blue-600"
              >
                Top {{ countryTopemit }}
              </div>
              <div class="leading-snug text-xl text-slate-900 font-medium">
                Cases in {{ this.viewCountry.continent }}
              </div>
              <!-- <a-progress class="w-full" :percent="50" status="active" /> -->
            </div>

            <div
              class="flex-1 text-center bg-white p-8 border-2 border-slate-50 rounded-2xl shadow-2xl shadow-slate-400/20"
            >
              <div
                class="leading-normal text-lg text-slate-500 font-medium uppercase tracking-wider"
              >
                continent
              </div>
              <div
                class="leading-tight text-5xl font-semibold text-slate-900 uppercase truncate"
              >
                {{ this.viewCountry.continent }}
              </div>
              <div class="leading-snug text-xl text-slate-900 font-medium">
                {{ continentArray.length }} Countries
              </div>
            </div>
          </div>
        </template>
        <div class="">
          <countries-in-continent
            :continentArray="continentArray"
            :viewCountry="viewCountry"
            :continentTotal="continentTotal"
            @countryTopB="countryTopC"
          />
        </div>
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
import modal from "@/components/comp/modal.vue";
import numeral from "numeral";
import axios from "axios";
import selectCountry from "@/components/selectCountry.vue";
import heatChart from "@/components/chart/heatChart.vue";

export default {
  name: "CountryView",
  components: {
    heatChart,
    selectCountry,
    wrap,
    modal,
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
      searchOn: null,
      countryTopemit: "",
      key: "1",
      loading: null,
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
      visible: null,
      selectedType: "cases",

      // v1: "",
      v: [],
      heatY: [],
      heatX: [],
    };
  },

  methods: {
    // Normal Method
    numF(num) {
      return numeral(num).format("0,0");
    },
    sliceDeath(index) {
      let from = this.vaccineArrayValues.indexOf(this.v[index]);
      let to = this.vaccineArrayValues.indexOf(this.v[index + 1]);
      let rs = this.dailyDeathArrayValues.slice(from, to);
      // console.log(" sliceDeath ", rs)
      return rs;
    },
    countryTopC(x) {
      this.countryTopemit = x;
    },
    tab() {
      // console.log(" tab ", )
      this.$refs.stack.sample();
    },
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
    vacEffi() {
      let totalVac =
        this.vaccineArrayValues[this.vaccineArrayValues.length - 1];
      let popu = this.viewCountry.population;
      let timesFullVac = Math.floor(totalVac / popu);
      this.v = [];
      for (let i = 0; i <= timesFullVac; i++) {
        const x = this.vaccineArrayValues.find((k) => k >= popu * i);
        this.v.push(x);
      }
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
        console.log(" error yourCountry", error);
      }
    },
    countryClick(countryCode="VN") {
      this.loading = true;
      this.$Progress.start();
      let country = this.allCountries.find((i) => i.code == countryCode);
      this.viewCountry = country;

      this.caseArrayValues = [];
      this.deathArrayValues = [];
      this.recoverArrayValues = [];
      this.vaccineArrayValues = [];
      this.activeArrayValues = [];

      this.dates = [];
      api
        .getForCountry(this.viewCountry.code, this.viewCountry.continent)
        .then(
          axios.spread((hisC, vacC, contiC) => {
            this.$Progress.set(80);
            // hisC - historyTimeline / vacC = vaccineTimeline / contiC - continentTotal
            this.handleGetForCountry(hisC, vacC, contiC);
          })
        )
        .then(() => {
          this.loading = false;
          this.$Progress.finish();
        });
    },
    handleGetForCountry(hisC, vacC, contiC) {
      //TOTAL HISTORY ------------
      let listTimeline = hisC.data.timeline;
      //xAsis
      const moment = require("moment");
      let rawDates = Object.keys(listTimeline.deaths);
      rawDates.forEach((i) => {
        let k = moment(i).format("DD MMM YYYY");
        this.dates.push(k);
      });

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
      this.dailyActiveArrayValues = this.dailyArrayValues(
        this.activeArrayValues
      );
      //DAILY CASE HISTORY - total[last] - total[last-1]
      this.dailyCaseArrayValues = this.dailyArrayValues(this.caseArrayValues);
      this.dailyDeathArrayValues = this.dailyArrayValues(this.deathArrayValues);
      this.dailyRecoverArrayValues = this.dailyArrayValues(
        this.recoverArrayValues
      );
      // heatChart
      this.heatY = [];
      this.heatX = [];
      let dailyDate = this.dates.slice(1);

      let a = 0;
      dailyDate.forEach((i, index) => {
        let x = moment(i).day();
        this.heatY.push([a, x, this.dailyCaseArrayValues[index]]);

        if ((a > 0 && x > 0 && x % 6 == 0) || (a == 0 && x % 6 == 0)) {
          let h = `W-${a}, to ${moment(i).format("DD/MM/YY")}`;
          this.heatX.push(h);
          a++;
        }
        if (index == dailyDate.length - 1) {
          this.heatX.push(`W-${a}, to ${moment(i).format("DD/MM/YY")}`);
        }
      });
      // console.log(" this.X ",this.heatX)

      // VACCINE -------
      let listTimelineVacC = vacC.data.timeline;
      let newVaccineArrayValues = Object.values(listTimelineVacC);
      let n = this.dates.length - newVaccineArrayValues.length;
      for (let i = 0; i < n; i++) {
        newVaccineArrayValues.unshift(0);
      }
      this.vaccineArrayValues = newVaccineArrayValues;
      this.dailyVaccineArrayValues = this.dailyArrayValues(
        newVaccineArrayValues
      );
      this.vacEffi();

      // CONTINENT ------
      this.continentArray = [];
      this.allCountries.forEach((i) => {
        if (i.continent == this.viewCountry.continent) {
          this.continentArray.push(i);
        }
      });
      this.continentTotal = contiC.data;
    },
  },
  // watch:{
  //   key(){
  //     this.tab()
  //   }
  // },

  computed: {},

  created() {
    // Asyncronous 1.then 2.async-await
    this.getAllCountries().then(() => {
      this.getUserCountry().then(() => {
        let code = this.yourCountry.countryCode;
        this.visible = true;
        setTimeout(() => {
          this.visible = false;
        }, 1000);
        this.countryClick(code);
      });
    });
  },

  beforeUpdate() {
    this.$Progress.start();
  },
  updated() {
    this.$Progress.finish();
  },
};
</script>

<style scoped></style>
