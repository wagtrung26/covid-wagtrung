<template>
  <div>
    <!-- <button @click="load">Load</button> -->
    <div class="flex justify-start sm:space-x-4 space-x-0 space-y-4">
      <div
        class="sm:flex sm:flex-col items-start sm:space-y-8 flex-wrap w-full sm:w-3/12"
      >
        <!-- CASE TYPE -->
        <div class="w-full">
          <h4
            class="text-left font-semibold tracking-wider text-slate-400/70 text-xs uppercase mb-3"
          >
            Cases type
          </h4>
          <a-select v-model:value="caseType" size="large" class="w-full">
            <a-select-option value="cases">Cases</a-select-option>
            <a-select-option value="deaths">Deaths</a-select-option>
          </a-select>
        </div>
        <!-- YAXIS -->
        <div class="w-full">
          <h4
            class="text-left font-semibold tracking-wider text-slate-400/70 text-xs uppercase mb-3"
          >
            yAxis type
          </h4>
          <a-select v-model:value="yType" size="large" class="w-full">
            <a-select-option value="logarithmic">Logarithmic</a-select-option>
            <a-select-option value="linear">Linear</a-select-option>
          </a-select>
        </div>

        <!-- Polynomial Order -->
        <!-- :tooltip-visible="true" -->

        <!-- checkbox regression -->
        <div class="w-full">
          <h4
            class="text-left font-semibold tracking-wider text-slate-400/70 text-xs uppercase mb-3"
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

      <div class="sm:w-9/12 w-full">
        <span
          >Predict Accuracy (R2)
          <a-progress :percent="(polyR2 * 100).toFixed(2)" />
          <!-- <h3> R2: {{polyR2}} </h3> -->
        </span>
        <h3>Polinominal Equation: {{ polyString }}</h3>

        <highcharts :options="chartOptions" ref="hc"></highcharts>

        <div class="c p-4 mt-4 border-t-slate-400">
          <div class="w-full">
            <h4
              class="text-left font-semibold tracking-wider text-slate-400/70 text-xs uppercase mb-5"
            >
              Number of raw data
            </h4>
            <a-slider
              v-model:value="numberRaw"
              :max="this.rawY.length"
              :min="50"
            />
          </div>
          <div class="w-full">
            <h4
              class="text-left font-semibold tracking-wider text-slate-400/70 text-xs uppercase mb-5"
            >
              Polynomial Order
            </h4>
            <a-slider v-model:value="orderPoly" :max="20" :min="1" />
          </div>

          <h2 class="text-3xl">Predict in the future</h2>
          <div class="flexCen space-x-2 mb-4">
            <span>After </span>
            <!-- <a-slider v-model:value="predictVal" :min="1" :max="100" /> -->
            <a-input-number
              v-model:value="predictVal"
              :min="1"
              :max="100"
              style="margin-left: 16px"
            />
            <span> days</span>
          </div>
          <h2 class="text-2xl mb-2" v-if="checkRegression.includes('pol')">
            Polynominal Prediction: {{ Math.floor(predictPolyVal) }} cases
          </h2>
          <h2 class="text-2xl" v-if="checkRegression.includes('lin')">
            Linear Prediction: {{ Math.floor(predictLinVal) }} cases
          </h2>
             <button @click="sample()" v-show="clicked">Apply Filter</button>
        </div>
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
      checkRegression: ["raw", "pol"],
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
  computed: {},
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
