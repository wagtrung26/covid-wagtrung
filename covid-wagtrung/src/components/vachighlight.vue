<template>
  <div>
    <!-- START-Template -->
    <p class="text-left text-sm tracking-wider font-semibold text-slate-500 uppercase mb-3">
      HIghlight
    </p>
    <h3 class="text-left text-3xl font-semibold tracking-tight text-slate-900">
      Daily Vaccine
    </h3>
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
  computed: {},
  created() {},
  updated() {
    this.topCaseC();
  },
};
</script>

<style lang="scss" scoped></style>
