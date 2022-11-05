<template>
  <div>
    <!-- START-Template -->
    <p
      class="text-left text-sm tracking-wider font-semibold text-slate-500 uppercase mb-3"
    >
      HIghlight
    </p>

    <div class="">
      <div class="">
        <h3
          class="text-left text-3xl font-semibold tracking-tight text-slate-900"
        >
          Daily Cases
        </h3>
        <div class="flex space-x-4 pt-4 pb-8">
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

      <div class="">
        <h3
          class="text-left text-3xl font-semibold tracking-tight text-slate-900"
        >
          Daily Deaths
        </h3>
        <div class="flex space-x-4 pt-4">
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
