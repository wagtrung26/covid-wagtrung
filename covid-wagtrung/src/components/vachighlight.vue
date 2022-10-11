<template>
  <div>
    <!-- START-Template -->
   

      <div>
       
        <p>First Dose Vaccine </p>
        <h1>{{ startVac }}</h1>
        <p>{{ statVacDate }}</p>
      </div>
      <div>
      

        <p>Daily Highest Vaccine </p>
        <h1>{{ topVac }}</h1>
        <p>{{ topVacDate }}</p>
      </div>


    <!-- END-Template -->
  </div>
</template>

<script>
// import { errorToaster } from "../../shared/service/ErrorHandler.js"
export default {
  components: {},
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
