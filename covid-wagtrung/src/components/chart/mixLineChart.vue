<template>
  <highcharts :options="chartOptions" ref="chart"></highcharts>
</template>

<script>
// import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  components: {},
  name: "mixLineChart",
  props: {
    y: Array,
    x: Array,
    type: String,
  },
  data() {
    return {
      avg: [],
      chartOptions: {
        chart: {
          type: "areaspline",
          height: 200,
          zoomBySingleTouch: true,
          zoomType: "x",
          // margin: [0,10,0,10],
        //   spacing: [0, 0, 0, 0],
        },
         credits: {
          enabled: false,
        },
        exporting: {
          enabled: false,
        },
        series: [
          {
            name: "DAILY DEATHS",
            // type: 'column',
            data: [0, 6, 9],
            lineWidth: 3,
            color: "#d6172d",
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1,
              },
              stops: [
                [0, "#e3606fb3"],
                [1, "rgb(255 255 255 / 52%)"],
              ],
            },
          },
          {
            name: "AVG ",
            type: "spline",
            data: [1, 1, 1],
            lineWidth: 3,
            color: "#525152",
            dashStyle: "shortdot",
          },
        ],

        title: {
          text: "",
          align: "left",
        //   margin: 24,
        },
    
        subtitle: {
          text: null,
        },
        yAxis: {
          title: {
            text: "",
          },
          gridLineWidth: 2,
          crosshair: true,
        },
        xAxis: {
          categories: [],
          accessibility: {
            description: "days",
          },
        },
        legend: {
            enabled: false,
          layout: "horizontal",
          align: "right",
          verticalAlign: "top",
          floating: false,
          x: -40,
          y: 0,
          // borderWidth: 1,
        },
        tooltip: {
          crosshairs: true,
          shared: true,
          // split: true,
          // backgroundColor: "#FCFFC5",
          // borderColor: "black",
          borderRadius: 10,
          borderWidth: 1,
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false,
            },
          },
          area: {
            fillOpacity: 0.2,
          },
          areaspline: {
            fillOpacity: 0.2,
          },
          // pointStart: 2010,
        },
      },
    };
  },
  methods: {
    // VUEX-Method
    // ...mapMutations(["increase"]),
    // VUEX-Action
    // ...mapActions(["handle"]),
    // Method
    avgFunc() {
      const _ = require("lodash");
      this.avg = [];
      this.x.forEach(() => {
        let av = Math.floor(_.mean(this.y));
        this.avg.push(av);
      });
    },
  },
  computed: {
    // VUEX-State
    // ...mapGetters(["count"]),
    // Computed
    cSample() {
      return 0;
    },
  },
  created() {},
  mounted() {},
  updated() {
    if (this.type) {
      this.chartOptions.series[0].color = "#0093ff";
      this.chartOptions.series[0].fillColor.stops[0] = [0, "#0093ff"];
      this.chartOptions.series[0].name = "DAILY CASES";
    }

    this.chartOptions.series[0].data = this.y;
    this.avgFunc();
    this.chartOptions.series[1].data = this.avg;
    this.chartOptions.xAxis.categories = this.x;
  },
};
</script>

<style scoped></style>
