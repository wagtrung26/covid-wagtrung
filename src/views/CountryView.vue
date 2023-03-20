<!-- eslint-disable no-unused-vars -->
<template>
  <!-- <p>{{ this.viewCountry }}</p> -->

  <div class="w-full mainApp">
    <div
      class="relative bg-fixed w-full h-[30rem] bg-gradient-to-b via-indigo-900 from-slate-900 to-blue-600 dark:bg-gradient-to-tr dark:from-slate-900 dark:via-slate-900 dark:to-indigo-700 z-0"
      style="clip-path: ellipse(85% 100% at 50% 0%)"
      v-show="!loading"
    ></div>

    <!-- ON LOAD Skelaton -->
    <div class="m-auto px-20 pt-32 bg-white min-h-screen" v-show="loading">
      <div class="">
        <div class="flex justify-center item-center space-x-4 mb-3">
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

    <modal title="Your Country" v-if="userCountry.countryName && visible">
      <div class="flexCen flex-col mt-10">
        <div class="h-32 w-32 relative">
          <img class="animate-spin" src="@/assets/fav.png" alt="" />
          <span
            class="animate-ping absolute inset-0 h-full w-full rounded-full border-4 border-emerald-200/70 opacity-75"
          ></span>
        </div>
        <div class="flexCen mt-6">
          <img v-if="this.viewCountry.flag"
            style="margin-right: 16px"
            :src="this.viewCountry.flag"
            alt=""
            width="80"
          />
          <h1
            class="text-6xl font-semibold text-slate-900 leading-snug tracking-tight truncate"
          >
            {{ userCountry.countryName }}
          </h1>
        </div>

        <p
          class="text-2xl uppercase font-semibold text-slate-500 tracking-wide mb-4"
        >
          IP: {{ userCountry.request }} - {{ userCountry.continentName }}
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
      <div class="relative -mt-80 z-10 mb-12">
        <statCard
          :viewCountry="viewCountry"
          :dailyCaseArrayValues="dailyCaseArrayValues"
          :dailyRecoverArrayValues="dailyRecoverArrayValues"
          :dailyDeathArrayValues="dailyDeathArrayValues"
          @searchOn="searchOn = true"
        />
      </div>

      <!-- Recommended countries -->
      <!-- i.todayCases,
          i.casesPerOneMillion,
          i.oneCasePerPeople,
          i.todayDeaths,
          i.deathsPerOneMillion,
          i.oneDeathPerPeople, -->
      <div class="mt-32">
        <p
          class="text-center text-base tracking-wider font-semibold text-slate-500 uppercase mb-4"
        >
          RECOMMENDATION
        </p>
        <h3
          class="text-center text-7xl font-semibold tracking-tight text-slate-900"
        >
          {{ recommendedData.length - 1 }} Countries
        </h3>

        <div class="text-slate-500 text-lg font-normal text center mt-4 mb-12">
          With similar epidemic situation to
          <span class="text-slate-800 font-semibold">{{
            viewCountry.name
          }}</span>
          <!-- ( K-Mean Cluster: {{ cluster }} ) -->
        </div>
        <div class="flex flex-row w-full flex-wrap">
          <div
            class="sm:w-1/4 w-full flex-auto mr-6 mb-6"
            v-for="(item, index) in recommendedData"
            :key="index"
          >
            <div
              class="p-6 bg-white flex divide-x items-start rounded-2xl shadow-xl shadow-slate-300 cursor-pointer border-2 border-transparent hover:border-blue-500"
              @click="countryClick(item.code)"
            >
              <div class="max-w-[80px] mr-6">
                <img class="h-12 rounded-lg" :src="item.flag" />
                <div class="text-left text-slate-500 mt-4">
                  <h4
                    class="text-lg leading-relaxed font-semibold tracking-tight text-slate-900 truncate"
                  >
                    {{ item.name }}
                  </h4>
                  <p class="text-sm truncate">{{ item.continent }}</p>
                </div>
              </div>

              <!-- <p>todayCases: {{item.todayCases}}</p> -->
              <div
                class="text-slate-500 text-left leading-relaxed space-y-2 pl-6"
              >
                <p>casesPerOneMillion: {{ numF(item.casesPerOneMillion) }}</p>
                <p>oneCasePerPeople: {{ item.oneCasePerPeople }}</p>
                <!-- <p>todayDeaths: {{item.todayDeaths}}</p> -->
                <p>deathsPerOneMillion: {{ numF(item.deathsPerOneMillion) }}</p>
                <p>oneDeathPerPeople: {{ item.oneDeathPerPeople }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 0 Regression -->
      <wrap
        title="Smart Prediction "
        :subTop="`machine learning Regression applications`"
      >
        <scatterMixChart :dates="dates" :rawY="scatterY" @caseType="caseType" />
      </wrap>
      <!--2 DAILY -->
      <wrap
        title="Daily Statistic"
        :subBot="`Everyday Cases in ${this.viewCountry.name}`"
        subTop="soligauge, Column-line, Stack"
      >
        <!-- daily Card Yesterday-->
        <div
          class="flexCen items-stretch w-full flex-wrap sm:space-x-8 sm:space-y-0 space-x-0 space-y-6 mb-10"
        >
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

        <div class="">
          <div class="flex sm:flex-row flex-col">
            <!-- Daily Map + Highlight -->
            <div class="sm:w-4/12 w-full h-full p-4 pt-0 pb-8">
              <countryMap class="mb-6" :viewCountry="viewCountry" />
              <div
                class="w-full pt-8 sm:pr-8 border-t border-slate-200 dark:border-slate-700"
              >
                <dailyHighlight
                  :dailyCaseArrayValues="dailyCaseArrayValues"
                  :dailyRecoverArrayValues="dailyRecoverArrayValues"
                  :dailyDeathArrayValues="dailyDeathArrayValues"
                  :viewCountry="viewCountry"
                  :dates="dates"
                />
              </div>
            </div>
            <div class="sm:w-8/12 w-full flex-1">
              <div
                class="w-full bg-white shadow-2xl shadow-slate-200/70 p-4 px-6 sm:pt-0 rounded-2xl dark:bg-slate-700/30 dark:shadow-none"
              >
                <!-- daily mixLineChart-->
                <div
                  class="pb-6 border-b border-slate-200 dark:border-slate-700"
                >
                  <div class="flex flex-start items-center space-x-3 mb-8">
                    <span class="bg-blue-500 rounded-xl p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        class="w-6 h-6 stroke-white"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                        />
                      </svg>
                    </span>
                    <a-tooltip placement="right">
                      <template #title
                        >Daily Covid-Cases data in weekday format</template
                      >
                      <p
                        class="text-left text-3xl font-semibold tracking-tight text-slate-900 dark:text-white"
                      >
                        Daily Cases & Weekly average
                      </p>
                    </a-tooltip>
                  </div>
                  <dailyChart
                    :y="dailyY"
                    @type="dailyType"
                    :dates="dates.slice(1)"
                  />
                </div>
                <!-- daily weekday heatChart -->
                <div
                  class="mt-8 pb-6 border-b border-slate-200 dark:border-slate-700"
                >
                  <div class="flex flex-start items-center space-x-3 mb-8">
                    <span class="bg-blue-500 rounded-xl p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        class="w-6 h-6 stroke-white"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                        />
                      </svg>
                    </span>
                    <a-tooltip placement="right">
                      <template #title
                        >Daily Covid-Cases data in weekday format</template
                      >
                      <p
                        class="text-left text-3xl font-semibold tracking-tight text-slate-900 dark:text-white"
                      >
                        Weekly Cases
                      </p>
                    </a-tooltip>
                  </div>

                  <heatChart :y="heatY" :x="heatX" @type="heatType" />
                </div>
                <!--daily stackChart -->
                <div class="mt-8">
                  <div class="flex flex-start items-center space-x-3 mb-8">
                    <span class="bg-blue-500 rounded-xl p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        class="w-6 h-6 stroke-white"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                        />
                      </svg>
                    </span>
                    <a-tooltip placement="right">
                      <template #title
                        >The percentage of Covid Factors in daily
                        cases</template
                      >
                      <p
                        class="text-left text-3xl font-semibold tracking-tight text-slate-900 dark:text-white"
                      >
                        Distribution Factors
                      </p>
                    </a-tooltip>
                  </div>

                  <stackChart
                    ref="stack"
                    :dailyActiveArrayValues="dailyActiveArrayValues"
                    :dailyRecoverArrayValues="dailyRecoverArrayValues"
                    :dailyDeathArrayValues="dailyDeathArrayValues"
                    :dates="dates.slice(1)"
                  />
                </div>
              </div>
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
        <div
          class="flex flex-wrap sm:space-x-8 sm:space-y-0 space-x-0 space-y-8"
        >
          <div class="sm:w-4/12 w-full">
            <vachighlight
              :dailyVaccineArrayValues="dailyVaccineArrayValues"
              :dates="dates"
            />
          </div>
          <div class="sm:w-8/12 w-full flex-1">
            <vaccine-chart
              :dailyCaseArrayValues="dailyCaseArrayValues"
              :dailyDeathArrayValues="dailyDeathArrayValues"
              :dailyVaccineArrayValues="dailyVaccineArrayValues"
              :dates="dates.slice(1)"
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
              <!-- text -->
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
                  <a-popover title="Number of Used Vaccines">
                    <template #content>
                      <p>
                        {{
                          this.dates[
                            this.vaccineArrayValues.indexOf(this.v[index + 1])
                          ]
                        }}
                        <strong>
                          {{
                            numF(
                              this.vaccineArrayValues[
                                this.vaccineArrayValues.indexOf(
                                  this.v[index + 1]
                                )
                              ]
                            )
                          }}
                        </strong>
                      </p>
                    </template>

                    <span
                      class="bg-slate-300/50 py-2 px-4 text-xl rounded-xl cursor-pointer"
                    >
                      {{
                        this.dates[
                          this.vaccineArrayValues.indexOf(this.v[index + 1])
                        ]
                      }}
                    </span>
                  </a-popover>
                </span>
              </div>
              <!-- layout -->
              <div
                class="flex w-full sm:flex-nowrap flex-wrap sm:space-x-8 sm:space-y-0 space-y-4 sm:mb-12"
              >
                <mixLineChart
                  class="sm:w-1/2 w-full"
                  :y="sliceDeath(index)"
                  :x="
                    this.dates.slice(
                      this.vaccineArrayValues.indexOf(this.v[index]) + 1,
                      this.vaccineArrayValues.indexOf(this.v[index + 1]) + 1
                    )
                  "
                />
                <mixLineChart
                  class="sm:w-1/2 w-full"
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
                <p
                  class="text-2xl leading-none font-semibold text-white bg-violet-600 py-2 px-4 rounded-lg mr-4"
                >
                  {{ index + 1 }}
                </p>
                <span class="text-2xl leading-none font-semibold text-slate-900"
                  >Up to Now
                </span>
              </div>
              <div
                class="flex w-full sm:flex-nowrap flex-wrap sm:space-x-8 sm:space-y-0 space-y-4"
              >
                <mixLineChart
                  class="sm:w-1/2 w-full"
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
                  class="sm:w-1/2 w-full"
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
        <div
          class="flex flex-wrap sm:flex-wrap sm:space-x-8 sm:space-y-0 space-y-8"
        >
          <div
            class="sm:w-4/12 w-full h-full bg-white p-4 border-2 border-slate-50 rounded-2xl shadow-2xl shadow-slate-400/20"
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

          <div class="sm:w-8/12 w-full flex-1">
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
import scatterMixChart from "@/components/machineLearning/scatterMixChart.vue";
// import { relativeTimeRounding } from "moment";
// import { mapGetters } from "vuex";
const moment = require("moment");

export default {
  name: "CountryView",
  components: {
    scatterMixChart,
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
      searchOn: false,
      countryTopemit: "",
      key: "1",
      loading: null,
      allCountries: [],
      recommendedData: [],
      cluster: null,

      userCountry: {},
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
      dailyY: [],
      scatterY: [],
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
        // "updated": 0,
        // "country": "string",
        // "countryInfo": {
        //   "_id": 0,
        //   "iso2": "string",
        //   "iso3": "string",
        //   "lat": 0,
        //   "long": 0,
        //   "flag": "string"
        // },
        // "cases": 0,
        // "todayCases": 0,
        // "deaths": 0,
        // "todayDeaths": 0,
        // "recovered": 0,
        // "todayRecovered": 0,
        // "active": 0,
        // "critical": 0,
        // "casesPerOneMillion": 0,
        // "deathsPerOneMillion": 0,
        // "tests": 0,
        // "testsPerOneMillion": 0,
        // "population": 0,
        // "continent": 0,
        // "oneCasePerPeople": 0,
        // "oneDeathPerPeople": 0,
        // "oneTestPerPeople": 0,
        // "activePerOneMillion": 0,
        // "recoveredPerOneMillion": 0,
        // "criticalPerOneMillion": 0

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
      } catch (e) {
        console.log(" allCountries err ", e);
      }
    },
    async getUserCountry() {
      // 2. get user country based on browser IP, at the beginning state
      try {
        this.userCountry = await api.yourCountry();
        // console.log("2 this.userCountry  ", this.userCountry);
      } catch (error) {
        console.log(" error userCountry", error);
      }
    },
    countryClick(countryCode = "VN") {
      this.loading = true;
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
            // hisC - historyTimeline / vacC = vaccineTimeline / contiC - continentTotal
            this.handleGetForCountry(hisC, vacC, contiC);
          })
        )
        .catch((error) => {
          alert(`${error.response.status} - ${error.response.data.message}`);

          this.caseArrayValues = [];
          this.deathArrayValues = [];
          this.recoverArrayValues = [];
          this.vaccineArrayValues = [];
          this.activeArrayValues = [];

          // activeArrayValues= [];
          this.dailyCaseArrayValues = [];
          this.dailyRecoverArrayValues = [];
          this.dailyDeathArrayValues = [];
          this.dailyVaccineArrayValues = [];
          this.dailyActiveArrayValues = [];

          this.v = [];
          this.heatY = [];
          this.heatX = [];
          this.dailyY = [];
          this.scatterY = [];

          this.recommendedData = [];
          this.cluster = null;
          this.countryTopemit = "...";
        })
        .then(() => {
          this.loading = false;
          this.visible = false;
          this.recommend();
        });
    },
    heatType(type = "cases") {
      // Reset
      this.heatY = [];
      this.heatX = [];
      let _heatY = [];
      let _heatX = [];

      let dailyDate = this.dates.slice(1);
      let a = 0;
      dailyDate.forEach((i, index) => {
        let x = moment(i).day();
        // Y
        if (type == "cases") {
          _heatY.push([a, x, this.dailyCaseArrayValues[index]]);
        } else if (type == "vaccine") {
          _heatY.push([a, x, this.dailyVaccineArrayValues[index]]);
        } else {
          // type = deaths
          _heatY.push([a, x, this.dailyDeathArrayValues[index]]);
        }

        // X
        if ((a > 0 && x > 0 && x % 6 == 0) || (a == 0 && x % 6 == 0)) {
          let h = `W-${a}, to ${moment(i).format("DD/MM/YY")}`;
          _heatX.push(h);
          a++;
        }
        if (index == dailyDate.length - 1) {
          _heatX.push(`W-${a}, to ${moment(i).format("DD/MM/YY")}`);
        }
      });
      // Assign to new
      this.heatY = _heatY;
      this.heatX = _heatX;
    },
    dailyType(type = "cases") {
      // daily Mix avg
      this.dailyCaseArrayValues = this.dailyArrayValues(this.caseArrayValues);
      this.dailyDeathArrayValues = this.dailyArrayValues(this.deathArrayValues);
      this.dailyRecoverArrayValues = this.dailyArrayValues(
        this.recoverArrayValues
      );
      this.dailyActiveArrayValues = this.dailyArrayValues(
        this.activeArrayValues
      );
      if (type == "cases") {
        this.dailyY = this.dailyCaseArrayValues;
      } else if (type == "deaths") {
        this.dailyY = this.dailyDeathArrayValues;
      } else if (type == "recover") {
        this.dailyY = this.dailyRecoverArrayValues;
      } else {
        this.dailyY = this.dailyActiveArrayValues;
      }
    },
    caseType(type = "cases") {
      // regression
      if (type == "cases") {
        this.scatterY = this.dailyCaseArrayValues;
      } else {
        this.scatterY = this.dailyDeathArrayValues;
      }
    },
    handleGetForCountry(hisC, vacC, contiC) {
      //TOTAL HISTORY ------------
      let listTimeline = hisC.data.timeline;
      if (listTimeline) {
        //xAsis
        let rawDates = Object.keys(listTimeline.deaths);
        let modifyDate = [];
        rawDates.forEach((i) => {
          let k = moment(i).format("DD MMM YYYY");
          modifyDate.push(k);
        });
        this.dates = modifyDate;

        //yAxis
        this.caseArrayValues = Object.values(listTimeline.cases);
        this.recoverArrayValues = Object.values(listTimeline.recovered);
        this.deathArrayValues = Object.values(listTimeline.deaths);
        this.activeArrayValues = [];
        let modifyActiveArrayValues = [];
        this.caseArrayValues.forEach((i, index) => {
          let active =
            i - this.deathArrayValues[index] - this.deathArrayValues[index];
          modifyActiveArrayValues.push(active);
        });
        this.activeArrayValues = modifyActiveArrayValues;

        //DAILY CASE HISTORY - total[last] - total[last-1]
        this.dailyType();
        this.caseType();
      }

      // VACCINE -------
      let listTimelineVacC = vacC.data.timeline;
      if (listTimeline) {
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

        // heatChart
        this.heatType();
      }
      // CONTINENT ------
      this.continentArray = [];
      let _continentArray = [];
      this.allCountries.forEach((i) => {
        if (i.continent == this.viewCountry.continent) {
          _continentArray.push(i);
        }
      });
      this.continentArray = _continentArray;
      this.continentTotal = contiC.data;
    },
    recommend() {
      // K-MEAN
      let rawRecommend = [];

      this.allCountries.forEach((i) => {
        rawRecommend.push([
          i.casesPerOneMillion,
          i.oneCasePerPeople,
          i.deathsPerOneMillion,
          i.oneDeathPerPeople,
        ]);
      });
      const skmeans = require("skmeans");
      var res = skmeans(rawRecommend, 20);
      // console.log(" res ", res);

      // res.idxs[this.viewCountryIndex]
      let arr = [];
      let KmeansArr = res.idxs;
      KmeansArr.forEach((i, index) => {
        if (i == KmeansArr[this.viewCountryIndex]) {
          arr.push(index);
        }
      });

      this.recommendedData = [];
      arr.forEach((i) => {
        this.recommendedData.push(this.allCountries[i]);
      });

      this.cluster = KmeansArr[this.viewCountryIndex];

      // console.log(" viewCountryIndex ", this.viewCountryIndex);
      // console.log(" viewCountry ", this.allCountries[this.viewCountryIndex]);
      // console.log(" viewCountry Clusster ", KmeansArr[this.viewCountryIndex]);
      // console.log(" this.recommendedData  ", this.recommendedData );
    },
    async firstLoad() {
      this.visible = true;
      this.loading = true;

      await this.getAllCountries();
      await this.getUserCountry();

      let code = this.userCountry.countryCode;
      // console.log(
      //   " user country:",
      //   code,
      //   this.userCountry.countryName,
      //   this.userCountry.request
      // );

      this.countryClick(code);
    },
  },
  // watch:{
  //   key(){
  //     this.tab()
  //   }
  // },

  computed: {
    // ...mapGetters(["allCountries", "userCountry"]),
    viewCountryIndex() {
      let k = null;
      this.allCountries.forEach((i, index) => {
        if (i.code == this.viewCountry.code) {
          k = index;
        }
      });
      return k;
    },
  },

  created() {
    this.firstLoad();
  },

  mounted() {},
};
</script>

<style scoped></style>
