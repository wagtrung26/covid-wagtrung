<template>
  <div>
    <!-- START-Template -->

    <highcharts class="hc" :options="chartOptions" ref="chart"></highcharts>

    <!-- END-Template -->
  </div>
</template>

<script>
import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";
// import * as api from "@/api";

exportingInit(Highcharts);
// import { errorToaster } from "../../shared/service/ErrorHandler.js"
export default {
  components: {},
  name: "sparklineChart",
  props: {
    typeC: String,
    data: Array
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: "area",
          // renderTo: "container",
          margin: [0, 0, 0, 0],
          height: 70,
          width: 200,
          backgroundColor: "rgba(0,0,0,0)"
          
          /* backgroundColor:'transparent' */
        },
        title: {
          text: "",
        },
        credits: {
          enabled: false,
        },
        exporting: {
          enabled: false,
        },
        xAxis: {
          labels: {
            enabled: true,
            categories: ["Day 1","Day 2","Day 3","Day 4","Day 5","Yesterday"],
          },
        },
        yAxis: {
          maxPadding: 0,
          minPadding: 0,
          gridLineWidth: 0,
          endOnTick: true,
  
          labels: {
            enabled: false,
          },
        },
        legend: {
          enabled: false,
        },
        tooltip: {
          enabled: true,
        },
        plotOptions: {
          series: {},
        },
        series: [
          {
            type: "area",
            data: [
              // ["daybefore", 10],
              // ["daybefore", 20],
              // ["Yesterday", 40],
              // ["Today", 50],
            ],
            enableMouseTracking: true,
            shadow: false,
            states: {
              // hover: {
              //   lineWidth: 1,
              // },
            },
            lineWidth: 4,
            color: "#0093ff",
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1,
              },
              stops: [
                [0, "rgb(174 174 174 / 46%)"],
                [1, "rgb(255 255 255 / 52%)"],
              ],
            },
            marker: {
              //enabled:false,
              radius: 0,
              states: {
                hover: {
                  radius: 4,
                },
              },
            },
          },
        ],
      },
    };
  },
  methods: {
    loadCase() {
      this.chartOptions.series[0].data = this.data.slice(-7);
      // console.log(this.data)

      if (this.typeC == "death") {
        this.chartOptions.series[0].color = "#d6172d";
        this.chartOptions.series[0].fillColor.stops[0] = [
          0,
          "rgb(214 23 45 / 57%)",
        ];
      } else if (this.typeC == "recover") {
        this.chartOptions.series[0].color = "#17d66d";
        this.chartOptions.series[0].fillColor.stops[0] = [
          0,
          "rgb(23 214 109 / 57%)",
        ];
      } else {
        this.chartOptions.series[0].color = "#0093ff";
        this.chartOptions.series[0].fillColor.stops[0] = [
          0,
          "rgb(0 147 255 / 54%)",
        ];
      }
    },
  },
  computed: {},
  async created() {
    // await this.loadCase();
  },
  updated() {
    this.loadCase() 
  }
};
</script>

<style lang="scss" scoped></style>
