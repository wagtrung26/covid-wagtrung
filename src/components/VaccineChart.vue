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
  name: "vacChart",
  props: {
    dailyCaseArrayValues: Array,
    // dailyRecoverArrayValues: Array,
    dailyDeathArrayValues: Array,
    dailyVaccineArrayValues: Array,
    dates: Array,
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: "areaspline",
          height: 500,
          zoomBySingleTouch: true,
          zoomType: "x",
          // spacing: [0, 40, 0, 40],
          backgroundColor: "rgba(0,0,0,0)"
        },
        title: {
          text: "",
          align: "left",
          // margin: 24,
        },

        credits: {
          enabled: false,
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
        yAxis: [
          {
            
            labels: {
              // format: "{value}%",
            },
            title: {
              enabled: true,
              text: ""
            },
            type: 'logarithmic', 
          },
          // {
          //   opposite: true,
          //   title: {
          //     text: "Deaths",
          //   },
          // },
        ],
        legend: {
          layout: "horizontal",
          align: "right",
          verticalAlign: "top",
          floating: true,
          x: -40,
          y: 0,
          // borderWidth: 1,
        },
        tooltip: {
          pointFormat:
            '<span style="color:{series.color}">{series.name}</span>:  ({point.y} people)<br/>',
          // split: true,
          //   <b>{point.percentage:.1f}%</b>
          shared: true,
        },
        plotOptions: {
          series: {
            lineWidth: 2,

            // pointStart: 1990,
          },
          areaspline: {
            // stacking: "percent",

            fillOpacity: 0.4,

            marker: {
              enabled: false,
            },
          },
        },
        series: [
          //   {
          //     name: "NEW RECOVERED",
          //     color: "#17d66d",
          //     data: [],
          //   },
          {
            name: "NEW VACCINES",
            color: "#9a0dd5",
            data: [],
          },
          {
            name: "NEW DEATHS",
            color: "#d6172d",
            data: [],
            // yAxis: 1
          },
          {
            name: "NEW CASES",
            color: "#0093ff",
            data: [],
            
          },
        ],
      },
    };
  },
  methods: {
    sample() {
      //   this.chartOptions.series[0].data = this.dailyCaseArrayValues.slice(-31);
      //   this.chartOptions.series[1].data =this.dailyRecoverArrayValues.slice(-31);
      this.chartOptions.series[2].data = this.dailyCaseArrayValues.slice(0);
      this.chartOptions.series[1].data = this.dailyDeathArrayValues.slice(0);
      this.chartOptions.series[0].data = this.dailyVaccineArrayValues.slice(0);

      this.chartOptions.xAxis.categories = this.dates.slice(1);
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
