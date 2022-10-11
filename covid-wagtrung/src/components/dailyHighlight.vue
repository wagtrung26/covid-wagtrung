<template>
  <div>
    <!-- START-Template -->
    <div class="flex">
      <div>
        <p>First Case Record</p>
        <h1>{{ startCase }}</h1>
        <p>{{ statCaseDate }}</p>
      </div>

      <div>
        <p>Daily Highest Case Record</p>
        <h1>{{ topCase }}</h1>
        <p>{{ topCaseDate }}</p>
      </div>
    </div>

    <div class="flex">
      <div>
        <p>First Death Record</p>
        <h1>{{ startDeath }}</h1>
        <p>{{ statDeathDate }}</p>
      </div>
      <div>
        <p>Daily Highest Death Record</p>
        <h1>{{ topDeath }}</h1>
        <p>{{ topDeathDate }}</p>
      </div>
    </div>

    <div class="flex">
      <div>
        <p>One case every</p>

        <h2>{{ viewCountry.oneCasePerPeople }} </h2>
        <p>people</p>
        <!-- <p>First Dose Vaccine </p>
        <h1>{{ startVac }}</h1>
        <p>{{ statVacDate }}</p> -->
      </div>
      <div>
           <p>One death every</p>
        <h2>{{ viewCountry.oneDeathPerPeople }} </h2>
        <p>people</p>

        <!-- <p>Daily Highest Vaccine </p>
        <h1>{{ topVac }}</h1>
        <p>{{ topVacDate }}</p> -->
      </div>
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
