<template>
  <div>
    <p>All times</p>
    <highcharts :options="chartOptions" ref="chart"></highcharts>
  </div>
</template>

<script>
import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";
// import * as api from "@/api";

exportingInit(Highcharts);

export default {
  components: {},
  name: "lineChart",
  props: {
    viewCountry: Object,
    caseArrayValues: Array,
    deathArrayValues: Array,
    recoverArrayValues: Array,
    dates: Array,
    chartOptions: Object,
  },
  data() {
    return {
     
    };
  },
  methods: {},
  computed: {},
  created() {
    //set to chartOptions
   
  },
  mounted() {},
};
</script>

<style lang="scss" scoped></style>
