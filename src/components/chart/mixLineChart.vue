<template>
  <div class="flexCen shadow-xl shadow-slate-200/70 bg-white p-8 rounded-2xl">
    <div class="flex flex-col items-center mr-8">
      <p
        class="text-left text-xs tracking-wider font-semibold text-slate-500 uppercase mb-3"
      >
        Average {{ type }}
      </p>
      <h2 class="text-left text-2xl font-semibold text-slate-900">
        {{ numF(avgVal) }}
      </h2>
    </div>

    <highcharts class="flex-1" :options="chartOptions" ref="chart"></highcharts>
  </div>
</template>

<script>
// import { mapGetters, mapMutations, mapActions } from "vuex";
import numeral from "numeral";
export default {
  components: {},
  name: "mixLineChart",
  props: {
    y: Array,
    x: Array,
    type: {
      type: String,
      default: "Death",
    },
  },
  data() {
    return {
      avg: [],
      avgVal: 0,
      chartOptions: {
        chart: {
          type: "areaspline",
          height: 150,
          zoomBySingleTouch: true,
          zoomType: "x",
          backgroundColor: "rgba(0,0,0,0)",
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
            data: [],
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
            data: [],
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
          gridLineWidth: 0,
          crosshair: true,
          type: "logarithmic",
          opposite: true,
        },
        xAxis: {
          categories: [],
          accessibility: {
            description: "days",
          },
          visible: false,
          gridLineWidth: 0,
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
          accessibility: {
    enabled: false
  },
        plotOptions: {
          series: {
          
			animation: false
		,
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
          responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                legend: {
                  align: "center",
                  verticalAlign: "bottom",
                  layout: "horizontal",
                },
                yAxis: {
                  labels: {
                    align: "left",
                    x: 0,
                    y: 0,
                  },
                  title: {
                    text: null,
                  },
                },
                subtitle: {
                  text: null,
                },
                credits: {
                  enabled: false,
                },
              },
            },
          ],
        },
      },
    };
  },
  methods: {
    numF(num) {
      return numeral(num).format("0,0");
    },
    // VUEX-Method
    // ...mapMutations(["increase"]),
    // VUEX-Action
    // ...mapActions(["handle"]),
    // Method
    avgFunc() {
      const _ = require("lodash");
      this.avg = [];
      let takeBig = this.y.filter((i) => i > 0);
      // console.log(" y ",this.y)
      // console.log(" takebig ",takeBig)
      this.x.forEach(() => {
        let av = Math.floor(_.mean(takeBig));
        this.avg.push(av);
      });
      this.avgVal = this.avg[0];
    },
    sample() {
      if (this.type == "cases") {
        this.chartOptions.series[0].color = "#0093ff";
        this.chartOptions.series[0].fillColor.stops[0] = [0, "#0093ff"];
        this.chartOptions.series[0].name = "DAILY CASES";
      }

      this.chartOptions.series[0].data = this.y;
      this.avgFunc();
      this.chartOptions.series[1].data = this.avg;
      this.chartOptions.xAxis.categories = this.x;
    },
  },
  watch: {
    y() {
      this.sample();
    },
  },
  mounted(){
    this.sample();
  }


};
</script>

<style scoped></style>
