<template>
  <div>
    <!-- <button @click="load">Load</button> -->
    <div class="flex justify-start mb-6">
      <div
        class="sm:flexCen sm:items-start sm:justify-start sm:space-x-8 sm:space-y-8 sm:mt-2 mt-4 flex-wrap w-full"
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
        <div class="">
          <h4
            class="text-left font-semibold tracking-wider text-slate-400/70 text-xs uppercase mb-5"
          >
            Visibility
          </h4>
          <a-checkbox-group v-model:value="checkRegression">
            <div class="flex space-x-4">
              <a-checkbox value="raw">Raw data</a-checkbox>

              <a-checkbox value="pol">Polynomial Regression</a-checkbox>

              <a-checkbox value="lin">Linear Regression</a-checkbox>
            </div>
          </a-checkbox-group>
        </div>
        

<!-- Polynomial Order -->
        <div class="c">
          <h4
            class="text-left font-semibold tracking-wider text-slate-400/70 text-xs uppercase mb-5"
          >
            Polynomial Order
          </h4>
          <a-slider
            v-model:value="orderPoly"
            :max="10"
            :min="2"
            :tooltip-visible="true"
          />
        </div>

        <div class="c">
          <h4
            class="text-left font-semibold tracking-wider text-slate-400/70 text-xs uppercase mb-5"
          >
            Polynominal Precision 
          </h4>
          <a-slider
            v-model:value="precPoly"
            :max="1000"
            :min="0"
            :tooltip-visible="true"
          />
        </div>

        <div class="c">
          <h4
            class="text-left font-semibold tracking-wider text-slate-400/70 text-xs uppercase mb-5"
          >
            Number of raw data
          </h4>
          <a-slider
            v-model:value="numberRaw"
            :max="1000"
            :min="10"
            :tooltip-visible="true"
          />
        </div>
      </div>
    </div>
    <h3> Polinominal Equation: {{polyString}} </h3>
    <h3> R2: {{polyR2}} </h3>
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
      numberRaw:30,
      orderPoly: 5,
      precPoly: 5,
      polyString:null,
      polyR2:null,
      show: false,
      clicked: false,
      yType: "linear",
      checkRegression: ["raw", "pol"],
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


        this.polyString = resultPolynomial.string
        this.polyR2=resultPolynomial.r2
        console.log(" something ",resultPolynomial.predict(resultPolynomial.points.length+30) )

      for (let i = 0; i < resultPolynomial.points.length; i++) {
        dataLinear.push(resultLinear.points[i][1]);
        dataPolynomial.push(resultPolynomial.points[i][1]);
      }

      this.chartOptions.series[2].data = dataLinear;
      this.chartOptions.series[1].data = dataPolynomial;
      this.chartOptions.series[0].data = dataRaw;
      this.clicked = false;
    },
  },
  computed: {},
  watch: {
    precPoly(){
      this.sample();
    },
    numberRaw(){
      this.sample();
    },
   
    orderPoly(){
      this.sample();
    },
    rawY() {
      this.sample();
    },
    yType() {
      this.chartOptions.yAxis.type = this.yType;
    },
    caseType() {
      this.$emit("caseType", this.caseType);
      if (this.caseType == "cases") {
        this.chartOptions.series[0].color = "#0093ff";
        this.chartOptions.series[0].name = "Daily Cases";
      } else {
        this.chartOptions.series[0].color = "#d6172d";
        this.chartOptions.series[0].name = "Daily Deaths";
      }
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
