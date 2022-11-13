<template>
  <div class="w-full bg-white shadow-2xl shadow-slate-500/20 rounded-2xl p-8 pt-4">
    <!-- START-Template -->
    <div class="flexCen justify-start space-x-4 mb-8">
      <span class="bg-purple-100 rounded-3xl p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-8 h-8 stroke-purple-600"
        >
        
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />


        </svg>
      </span>
      <div class="my-auto">
        <p
          class="text-left text-sm tracking-wider font-semibold text-slate-400 uppercase mb-2"
        >
          HIghlight
        </p>
        <p
          class="text-left text-3xl font-semibold tracking-tight text-slate-900 "
        >
          Daily Vaccines
        </p>
      </div>
    </div>
    <div class="space-y-4">
      <card
        subTop="First Dose Vaccine "
        :title="startVac"
        :subBot="statVacDate"
      />

      <card
        subTop="Daily Highest Vaccine "
        :title="topVac"
        :subBot="topVacDate"
      />
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
    dailyVaccineArrayValues: Array,
    dates: Array,
  },
  data() {
    return {
      startVac: "",
      startVacDate: "",
      topVac: "",
      topVacDate: "",
    };
  },
  methods: {
    topCaseC() {
      this.startVac = this.dailyVaccineArrayValues.find((x) => x > 0);
      this.statVacDate =
        this.dates.slice(1)[
          this.dailyVaccineArrayValues.indexOf(this.startVac)
        ];
      this.topVac = Math.max(...this.dailyVaccineArrayValues);
      this.topVacDate =
        this.dates.slice(1)[this.dailyVaccineArrayValues.indexOf(this.topVac)];
    },
  },
  watch:{
    dailyVaccineArrayValues(){
    this.topCaseC();

    }
  },
  computed: {},
  created() {},
  updated() {
  },
};
</script>

<style lang="scss" scoped></style>
