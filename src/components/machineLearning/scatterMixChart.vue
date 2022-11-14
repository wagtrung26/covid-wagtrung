<template>
  <div>
    <button @click="load">Load</button>
    <highcharts :options="chartOptions" v-if="show"></highcharts>
    <a-skeleton v-if="clicked"
            active
            shape="round"
            :paragraph="{ rows: 3 }"
            style="width: 100%"
          />

    <!-- END-Template -->
  </div>
</template>

<script>
// import { errorToaster } from "../../shared/service/ErrorHandler.js"
import regression from "regression";
export default {
  components: {},
  name: "scatterMix",
  props: {
    rawY: Array
  },
  data() {
    return {
      show:false,
      clicked:false,
      chartOptions: {
        chart: {
          type: "spline",
        },
        title: {
          text: "",
        },

        subtitle: {
          text: "",
        },

        yAxis: {
          title: {
            text: null,
          },
          // max: 100,
          // min: 0,
          type: 'logarithmic', 
        },

        xAxis: {
          type: "datetime",
        },
        tooltip: {
          xDateFormat: "%d-%m-%Y",
          shared: true,
          // valueDecimals: 2,
        },
        plotOptions: {
          //   scatter: {
          //     marker: {
          //       radius: 3,
          //       symbol: "circle",
          //       states: {
          //         hover: {
          //           enabled: true,
          //           lineColor: "rgb(100,100,100)",
          //         },
          //       },
          //     },
          //     states: {
          //       hover: {
          //         marker: {
          //           enabled: true,
          //         },
          //       },
          //     },
          //   },
          series: {
            label: {
              connectorAllowed: false,
            },
            marker: {
              enabled: true,
            },
            pointStart: Date.UTC(2022,7,6),

            pointInterval: 24 * 3600 * 1000, // one day
          },
        },
        accessibility: {
          enabled: false,
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

        series: [
          {
            name: "Linear regression",
            color: "#0000FF",
            data: [],
            marker: {
              enabled: false,
            },
          },
          {
            name: "Polynomial regression",
            color: "#FF0000",
            data: [],
            marker: {
              enabled: false,
            },
          },
          {
            name: "Daily cases",
            data: [],
            type: "spline",
            lineWidth: 0,
            marker: {
              enabled: "true",
              radius: 4,
              symbol: "circle",
              states: {
                hover: {
                  enabled: "true",
                },
              },
            },
            states: {
              hover: {
                lineWidthPlus: 0,
              },
            },
          },
        ],
      },
    };
  },
  methods: {
    load(){
      this.clicked=true;
      this.show=true;
      this.sample();
    },
    sample() {
      let dataRaw = this.rawY.slice(-100)
      let data = [];
      dataRaw.forEach((i, index)=>{
        let spot = [index,i]
        data.push(spot)
      })

      let resultLinear = regression.polynomial(data, {
        order: 1,
        precision: 20,
      });
      let resultPolynomial = regression.polynomial(data, {
        order: 5,
        precision: 20,
      });
      let dataLinear = [],
        dataPolynomial = [];

      for (let i = 0; i < resultPolynomial.points.length; i++) {
        dataLinear.push(resultLinear.points[i][1]);
        dataPolynomial.push(resultPolynomial.points[i][1]);
      }

      this.chartOptions.series[0].data = dataLinear;
      this.chartOptions.series[1].data = dataPolynomial;
      this.chartOptions.series[2].data = dataRaw;
      this.clicked=false;

    },
  },
  computed: {},
  watch: {
    rawY() {
      this.sample();
    },
    // range() {
    //   this.sample();
    // },
  },
  created() {
    // this.sample();
  },
};
</script>

<style scoped></style>
