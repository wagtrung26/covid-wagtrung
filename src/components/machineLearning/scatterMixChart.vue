<template>
  <div>
    <!-- <button @click="load">Load</button> -->
    <div class="flex justify-start sm:space-x-8">
      <div
        class="sm:flex sm:flex-col items-start flex-wrap w-full sm:w-3/12 border-r-2 pr-8 border-neutral-100"
      >
        <div class="w-full mb-10">
          <p
            class="text-base leading-normal font-medium text-left text-slate-900 mb-6"
          >
            Prediction Filter
          </p>
          <h4
            class="text-left font-semibold tracking-wider text-slate-400/70 text-xs uppercase mb-3 mt-6"
          >
            Number of raw data
          </h4>
          <a-slider
            v-model:value="numberRaw"
            :max="this.rawY.length"
            :min="50"
          />
          <h4
            class="text-left font-semibold tracking-wider text-slate-400/70 text-xs uppercase mb-3 mt-6"
          >
            Polynomial Order
          </h4>
          <a-slider v-model:value="orderPoly" :max="20" :min="1" />

          <h4
            class="text-left font-semibold tracking-wider text-slate-400/70 text-xs uppercase mb-3 mt-6"
          >
            Date Prediction
          </h4>
          <div class="flexCen justify-start space-x-2">
            <span>After </span>
            <a-input-number
              v-model:value="predictVal"
              :min="1"
              :max="100"
              style="margin-left: 16px"
            />
            <span> days</span>
          </div>
        </div>

        <div class="w-full">
          <p
            class="text-base leading-normal font-medium text-left text-slate-900 mb-6"
          >
            Chart Filter
          </p>

          <!-- CASE TYPE -->
          <div class="">
            <h4
              class="text-left font-semibold tracking-wider text-slate-400/70 text-xs uppercase mb-3 mt-6"
            >
              Cases type
            </h4>
            <a-select v-model:value="caseType" size="large" class="w-full">
              <a-select-option value="cases">Cases</a-select-option>
              <a-select-option value="deaths">Deaths</a-select-option>
            </a-select>
          </div>
          <!-- YAXIS -->
          <div class="">
            <h4
              class="text-left font-semibold tracking-wider text-slate-400/70 text-xs uppercase mb-3 mt-6"
            >
              yAxis type
            </h4>
            <a-select v-model:value="yType" size="large" class="w-full">
              <a-select-option value="logarithmic">Logarithmic</a-select-option>
              <a-select-option value="linear">Linear</a-select-option>
            </a-select>
          </div>
          <!-- checkbox regression -->
          <div class="">
            <h4
              class="text-left font-semibold tracking-wider text-slate-400/70 text-xs uppercase mb-3 mt-6"
            >
              Visibility
            </h4>
            <a-checkbox-group class="w-full" v-model:value="checkRegression">
              <div class="flex items-start flex-col space-y-4 space-x-0">
                <a-checkbox value="raw">Raw data</a-checkbox>

                <a-checkbox value="pol">Polynomial Regression</a-checkbox>

                <a-checkbox value="lin">Linear Regression</a-checkbox>
              </div>
            </a-checkbox-group>
          </div>
        </div>
      </div>

      <div class="sm:w-9/12 w-full">
        <div
          class="flexCen bg-white p-6 shadow-xl shadow-slate-200/50 rounded-2xl mb-10 space-x-2"
        >
          <div class="w-full sm:w-3/12">
            <a-tooltip placement="top">
              <template #title>Predict Acccuracy(R2)</template>
              <a-progress
                type="dashboard"
                :width="150"
                :percent="(polyR2 * 100).toFixed(1)"
              />
            </a-tooltip>
          </div>

          <div class="w-full flex flex-col text-left justify-start sm:w-6/12">
            <h2
              class="text-2xl leading-normal font-medium text-left text-slate-900 mb-6"
            >
              Prediction after
              <span class="px-3 rounded border">{{ predictVal }} days</span>
            </h2>

            <div class="flex flex-wrap justify-start space-x-10">
              <div class="" v-if="checkRegression.includes('pol')">
                <div
                  class="text-left inline-flex items-center border-l-6 border-[#ff008f] font-semibold tracking-wider text-slate-500 dark:text-slate-400/80 text-xs uppercase mb-4 truncate"
                >
                  <span class="w-2 h-4 bg-[#ff008f] rounded-full mr-2"></span>
                  Polinominal
                </div>
                <h2
                  class="text-left text-5xl font-semibold tracking-normal text-slate-900 dark:text-white mb-2"
                >
                  {{ Math.floor(predictPolyVal) }}
                </h2>
                <div
                  class="inline-flex items-center bg-slate-100 px-2 rounded text-slate-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                    v-if="predictUpDown > 0"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                    />
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                     v-if="predictUpDown <= 0"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181"
                    />
                  </svg>

                  <p>
                    {{ predictUpDown }}
                  </p>
                </div>
              </div>
              <div class="" v-if="checkRegression.includes('lin')">
                <div
                  class="text-left inline-flex items-center border-l-6 border-[#ff008f] font-semibold tracking-wider text-slate-500 dark:text-slate-400/80 text-xs uppercase mb-4 truncate"
                >
                  <span class="w-2 h-4 bg-[#f56500] rounded-full mr-2"></span>
                  Linear
                </div>
                <h2
                  class="text-left text-5xl font-semibold tracking-normal text-slate-900 dark:text-white"
                >
                  {{ Math.floor(predictLinVal) }}
                </h2>
              </div>
            </div>
          </div>

          <div class="sm:w-3/12">
            <button
              class="btnPri flexCen"
              :disabled="!clicked"
              @click="sample()"
            >
              Predict Now

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 ml-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </button>
          </div>
        </div>

        <highcharts :options="chartOptions" ref="hc"></highcharts>
        <h3 class="text-left p-4 bg-slate-50 mt-4 rounded-2xl leading-normal">
          Polinominal Equation: {{ polyString }}
        </h3>
      </div>
    </div>

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
// const moment = require("moment");
export default {
  components: {},
  name: "scatterMix",
  emits: ["caseType"],
  props: {
    rawY: Array,
    dates: Array,
  },
  data() {
    return {
      predictPolyVal: "",
      predictLinVal: "",
      predictVal: 7,
      numberRaw: 50,
      orderPoly: 5,
      precPoly: 20,
      polyString: null,
      polyR2: null,
      show: false,
      clicked: false,
      yType: "linear",
      checkRegression: ["raw", "pol", "lin"],
      caseType: "cases",
      chartOptions: {
        chart: {
          type: "spline",
          zoomBySingleTouch: true,
          zoomType: "xy",
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

        subtitle: {
          text: "",
        },

        yAxis: {
          title: {
            text: null,
          },
          // max: 100,
          // min: 1,
          // type: 'logarithmic',
        },

        xAxis: {
          type: "datetime",
          // categories:[]
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
        legend: {
          enabled: false,
          layout: "horizontal",
          align: "right",
          verticalAlign: "top",
          floating: true,
          x: -40,
          y: 0,
          borderWidth: 1,
          backgroundColor: "#FFFFFF",
          shadow: true,
        },

        series: [
          {
            name: "Daily cases",
            data: [],
            type: "spline",
            lineWidth: 0,
            color: "#0093ff",
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
            name: "Linear regression",
            visible: false,
            color: "#ff7600",
            lineWidth: 3,
            data: [],
            marker: {
              enabled: false,
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
      this.$emit("caseType", this.caseType);
      if (this.caseType == "cases") {
        this.chartOptions.series[0].color = "#0093ff";
        this.chartOptions.series[0].name = "Daily Cases";
      } else {
        this.chartOptions.series[0].color = "#d6172d";
        this.chartOptions.series[0].name = "Daily Deaths";
      }
      this.clicked = false;
      //  this.chartOptions.xAxis.categories = this.dates.slice(
      //   parseInt(-this.numberRaw)
      // );
      // let l = moment(this.dates[this.dates.length - this.numberRaw]).format("YYYY,M,D")

      let dataRaw = this.rawY.slice(-this.numberRaw);
      let data = [];
      dataRaw.forEach((i, index) => {
        let spot = [index, i];
        data.push(spot);
      });

      let resultLinear = regression.polynomial(data, {
        order: 1,
        precision: 120,
      });
      let resultPolynomial = regression.polynomial(data, {
        order: this.orderPoly,
        precision: this.precPoly,
      });
      let dataLinear = [],
        dataPolynomial = [];

      this.polyString = resultPolynomial.string;
      this.polyR2 = resultPolynomial.r2;
      // console.log(
      //   " something ",
      //   resultPolynomial.predict(resultPolynomial.points.length + 30)
      // );

      for (
        let i = 0;
        i < resultPolynomial.points.length + this.predictVal;
        i++
      ) {
        if (resultPolynomial.points[i]) {
          dataLinear.push(resultLinear.points[i][1]);
          dataPolynomial.push(resultPolynomial.points[i][1]);
        } else {
          dataPolynomial.push(resultPolynomial.predict(i)[1]);
          dataLinear.push(resultLinear.predict(i)[1]);
        }
        // console.log(" c ", resultPolynomial.points[i][1])
      }

      // let u = this.dates.length - this.numberRaw;
      // let b = this.dates[u];
      // this.chartOptions.plotOptions.series.pointStart = Date.parse(b);

      // predictVal
      this.predictPolyVal = dataPolynomial[dataPolynomial.length - 1];
      this.predictLinVal = dataLinear[dataLinear.length - 1];

      this.chartOptions.series[2].data = dataLinear;
      this.chartOptions.series[1].data = dataPolynomial;
      this.chartOptions.series[0].data = dataRaw;
      this.clicked = false;
    },
  },
  computed: {
    predictUpDown() {
      if (this.predictPolyVal > 0) {
        if (this.rawY[this.rawY.length - 1] > this.predictPolyVal) {
          return (
            this.rawY[this.rawY.length - 1] - Math.floor(this.predictPolyVal)
          );
        } else {
          return (
            Math.floor(this.predictPolyVal) - this.rawY[this.rawY.length - 1]
          );
        }
      } else {
        return 0 - this.rawY[this.rawY.length - 1];
      }
    },
  },
  watch: {
    predictVal() {
      // this.sample();
      this.clicked = true;
    },
    precPoly() {
      // this.sample();
      this.clicked = true;
    },
    numberRaw() {
      // this.sample();
      this.clicked = true;
    },

    orderPoly() {
      // this.sample();
      this.clicked = true;
    },
    rawY() {
      this.sample();
    },
    yType() {
      this.chartOptions.yAxis.type = this.yType;
    },
    caseType() {
      this.$emit("caseType", this.caseType);
    },
    checkRegression() {
      let k = ["raw", "pol", "lin"];
      k.forEach((i, index) => {
        if (this.checkRegression.includes(i)) {
          // linear
          this.chartOptions.series[index].visible = true;
        } else {
          this.chartOptions.series[index].visible = false;
        }
      });
    },
  },
  created() {
    // this.sample();
  },
};
</script>

<style scoped></style>
