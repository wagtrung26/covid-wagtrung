<template>
  <div>
    <!-- START-Template -->

    <div class="">
        <!-- case -->
      <div class="mb-14">
        <div class="flexCen justify-start space-x-4 mb-4">
          <span class="bg-blue-100  rounded-3xl p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8 stroke-blue-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
              />
            </svg>
          </span>
          <div class="my-auto">
            <p
              class="text-left text-sm tracking-wider font-semibold text-slate-400 uppercase mb-2"
            >
              HIghlight
            </p>
            <h3
              class="text-left text-3xl font-semibold tracking-tight text-slate-900 "
            >
              Daily Cases</h3>
          </div>
        </div>

        <div class="flex flex-col flex-wrap space-y-4 pt-4 ">
          <card
            subTop="First cases "
            :title="startCase"
            :subBot="statCaseDate"
          />
          <card
            subTop="Daily Highest Case "
            :title="topCase"
            :subBot="topCaseDate"
          />
          <card
            subTop="One case per people "
            :title="viewCountry.oneCasePerPeople"
          />
        </div>
      </div>

        <!-- death -->
      <div class=" pt-10 border-t border-slate-200 dark:border-slate-700">
        <div class="flexCen justify-start space-x-4 mb-4">
           <span class="bg-rose-100  rounded-3xl p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8 stroke-rose-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </span>
          <div class="my-auto">
            <p
              class="text-left text-sm tracking-wider font-semibold text-slate-500 uppercase mb-2"
            >
              HIghlight
            </p>
            <h3
              class="text-left text-3xl font-semibold tracking-tight text-slate-900"
            >
              Daily Deaths
            </h3>
          </div>
        </div>

        <div class="flex flex-col flex-wrap space-y-4 pt-4">
          <card
            subTop="First Death "
            :title="startDeath"
            :subBot="statDeathDate"
          />
          <card
            subTop="Daily Highest Death "
            :title="topDeath"
            :subBot="topDeathDate"
          />
          <card
            subTop="One death per people "
            :title="viewCountry.oneDeathPerPeople"
          />
        </div>
      </div>
    </div>

    <!-- END-Template -->
  </div>
</template>

<script>
// import { errorToaster } from "../../shared/service/ErrorHandler.js"
import card from "@/components/comp/card.vue";

export default {
  components: { card },
  name: "dailyHighlight",
  props: {
    dailyCaseArrayValues: Array,
    dailyRecoverArrayValues: Array,
    dailyDeathArrayValues: Array,
    viewCountry: Object,
    dates: Array,
  },
  data() {
    return {
      startCase: "",
      statCaseDate: "",
      startDeath: "",
      statDeathDate: "",
      topCase: "",
      topCaseDate: "",
      topDeath: "",
      topDeathDate: "",
      startVac: "",
      startVacDate: "",
    };
  },
  methods: {
    topCaseC() {
      // const _ = require("lodash");
      this.topCase = Math.max(...this.dailyCaseArrayValues);
      let k = this.dailyCaseArrayValues.indexOf(this.topCase);
      this.topCaseDate = this.dates.slice(1)[k];

      this.topDeath = Math.max(...this.dailyDeathArrayValues);
      let x = this.dailyDeathArrayValues.indexOf(this.topDeath);
      this.topDeathDate = this.dates.slice(1)[x];

      this.startCase = this.dailyCaseArrayValues.find((x) => x > 0);
      this.statCaseDate =
        this.dates.slice(1)[this.dailyCaseArrayValues.indexOf(this.startCase)];

      this.startDeath = this.dailyDeathArrayValues.find((x) => x > 0);
      this.statDeathDate =
        this.dates.slice(1)[
          this.dailyDeathArrayValues.indexOf(this.startDeath)
        ];

      // this.startVac = this.dailyVaccineArrayValues.find((x) => x > 0);
      // this.statVacDate =
      //   this.dates.slice(1)[
      //     this.dailyVaccineArrayValues.indexOf(this.startVac)
      //   ];
      // this.topVac = Math.max(...this.dailyVaccineArrayValues);
      // this.topVacDate =
      //   this.dates[this.dailyVaccineArrayValues.indexOf(this.topVac)];
    },
  },
  computed: {},
  created() {},
  updated() {
    this.topCaseC();
  },
};
</script>

<style lang="scss" scoped></style>
