<template>
  <div>
    <!-- <button @click="load">Load</button> -->
    <div class="flex justify-start mb-6">
      <div
        class="sm:flexCen sm:items-end sm:justify-start sm:space-x-8 sm:mt-2 mt-4 sm:space-y-0 space-y-6 flex-wrap w-full"
      >
        <!-- YAXIS -->
        <div class="">
          <h4
            class="text-left font-semibold tracking-wider text-slate-400/70 text-xs uppercase mb-3"
          >
            yAxis type
          </h4>
          <a-select v-model:value="yType" size="large" class="sm:w-48 w-full">
            <a-select-option value="logarithmic">Logarithmic</a-select-option>
            <a-select-option value="linear">Linear</a-select-option>
          </a-select>
        </div>
        <!-- CASE TYPE -->
        <div class="">
          <h4
            class="text-left font-semibold tracking-wider text-slate-400/70 text-xs uppercase mb-3"
          >
            Cases type
          </h4>
          <a-select
            v-model:value="caseType"
            size="large"
            class="sm:w-48 w-full"
          >
            <a-select-option value="cases">Cases</a-select-option>
            <a-select-option value="deaths">Deaths</a-select-option>
          </a-select>
        </div>
        <!-- checkbox regression -->
        <a-checkbox-group v-model:value="checkRegression">
          <a-row>
            <a-col :span="8">
              <a-checkbox value="raw">Daily Raw data</a-checkbox>
            </a-col>
               <a-col :span="8">
              <a-checkbox value="pol">Polynomial</a-checkbox>
            </a-col>
            <a-col :span="8">
              <a-checkbox value="lin">Linear </a-checkbox>
            </a-col>
         
          </a-row>
        </a-checkbox-group>
      </div>
    </div>
    <highcharts :options="chartOptions"></highcharts>
    <!-- <a-skeleton
      v-if="clicked"
      active
      shape="round"
      :paragraph="{ rows: 3 }"
      style="width: 100%"
    /> -->

    <!-- END-Template -->
  </div>
</template>

<script>
// import { errorToaster } from "../../shared/service/ErrorHandler.js"
import regression from "regression";
export default {
  components: {},
  name: "scatterMix",
  emits: ["caseType"],
  props: {
    rawY: Array,
  },
  data() {
    return {
      show: false,
      clicked: false,
      yType: "linear",
      checkRegression: ['raw', 'pol'],
      caseType: "cases",
      chartOptions: {
        chart: {
          type: "spline",
          zoomBySingleTouch: true,
          zoomType: "y",
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
          min: 1,
          // type: 'logarithmic',
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
            pointStart: Date.UTC(2020, 0, 23),

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
            visible: false,
            color: "#ff7600",
            lineWidth: 3,
            data: [],
            marker: {
              enabled: false,
            },
          },
          {
            name: "Polynomial regression",
            color: "#ff008f",
            lineWidth: 3,
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
            color: "#0093ff",
            marker: {
              enabled: "true",
              radius: 2,
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
    load() {
      this.clicked = true;
      this.show = true;
      this.sample();
    },
    sample() {
      let dataRaw = this.rawY;
      let data = [];
      dataRaw.forEach((i, index) => {
        let spot = [index, i];
        data.push(spot);
      });

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
      this.clicked = false;
    },
  },
  computed: {},
  watch: {
    rawY() {
      this.sample();
    },
    yType() {
      this.chartOptions.yAxis.type = this.yType;
    },
    caseType() {
      this.$emit("caseType", this.caseType);
      if (this.caseType == "cases") {
        this.chartOptions.series[2].color = "#0093ff";
        this.chartOptions.series[2].name = "Daily Cases";
      } else {
        this.chartOptions.series[2].color = "#d6172d";
        this.chartOptions.series[2].name = "Daily Deaths";
      }
    },
    checkRegression(){
      
    }
  },
  created() {
    // this.sample();
  },
};
</script>

<style scoped></style>
