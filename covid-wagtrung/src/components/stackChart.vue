<template>
  <div>
    <!-- START-Template -->

    <highcharts :options="chartOptions" ref="chart"></highcharts>

    <!-- END-Template -->
  </div>
</template>

<script>
// import { errorToaster } from "../../shared/service/ErrorHandler.js"
export default {
  components: {},
  name: "stackChart",
  props: {
    dailyCaseArrayValues: Array,
    dailyRecoverArrayValues: Array,
    dailyDeathArrayValues: Array,
    dates: Array,
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: "area",
          height: 500
        },
        title: {
          useHTML: true,
          text: "Stack New Cases",
        },
        subtitle: {
          text: "",
        },
        accessibility: {
          point: {
            valueDescriptionFormat:
              "{index}. {point.category}, {point.y:,.1f} billions, {point.percentage:.1f}%.",
          },
        },
        xAxis: {
          categories: [],
          accessibility: {
            description: "days",
          },
        },
        yAxis: {
          labels: {
            format: "{value}%",
          },
          title: {
            enabled: false,
          },
        },
        tooltip: {
          pointFormat:
            '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.1f} people)<br/>',
          split: true,
        },
        plotOptions: {
          series: {
            // pointStart: 1990,
          },
          area: {
            stacking: "percent",
            marker: {
              enabled: false,
            },
          },
        },
        series: [
          {
            name: "NEW CASES",
            color: "#0093ff",
            data: [],
          },
          {
            name: "NEW RECOVERED",
            color: "#17d66d",
            data: [],
          },
          {
            name: "NEW DEATHS",
            color: "#d6172d",
            data: [],
          },
        ],
      },
    };
  },
  methods: {
    sample() {
      this.chartOptions.series[0].data = this.dailyCaseArrayValues.slice(-31, -1);
      this.chartOptions.series[1].data =
        this.dailyRecoverArrayValues.slice(-31, -1);
      this.chartOptions.series[2].data = this.dailyDeathArrayValues.slice(-31, -1);
      this.chartOptions.xAxis.categories = this.dates.slice(-31, -1);
    },
  },
  computed: {},
  created() {},
  updated() {
    this.sample();
  },
};
</script>

<style scoped></style>
