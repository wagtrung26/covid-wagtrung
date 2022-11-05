<template>
  <div class="chart">
    <div class="btnGroup">
      <button
        class="btn"
        @click="rangeClick(30)"
        :class="{ active: this.selectedRange == 30 }"
      >
        30 days
      </button>
      <button
        class="btn"
        @click="rangeClick(7)"
        :class="{ active: this.selectedRange == 7 }"
      >
        7 days
      </button>
      <button
        class="btn"
        @click="rangeClick(365)"
        :class="{ active: this.selectedRange == 365 }"
      >
        a year
      </button>
      <button
        class="btn"
        @click="rangeClick(0)"
        :class="{ active: this.selectedRange == 0 }"
      >
        All time
      </button>
    </div>

    <div class="btnGroup2">
      <button
        class="btn"
        @click="typeClick('case')"
        :class="{ active: this.selectedType == 'case' }"
      >
        New Cases
      </button>
      <button
        class="btn"
        @click="typeClick('active')"
        :class="{ active: this.selectedType == 'active' }"
      >
        Active Cases
      </button>
      <button
        class="btn"
        @click="typeClick('death')"
        :class="{ active: this.selectedType == 'death' }"
      >
        New Deaths
      </button>
      <button
        class="btn"
        @click="typeClick('recover')"
        :class="{ active: this.selectedType == 'recover' }"
      >
        New Recovered
      </button>
    </div>

    <highcharts class="hc" :options="chartOptions" ref="chart"></highcharts>
  </div>
</template>

<script>
import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";

exportingInit(Highcharts);

export default {
  components: {
  },
  name: "lineChart",
  props: {
    dailyCaseArrayValues: Array,
    dailyActiveArrayValues: Array,
    dailyRecoverArrayValues: Array,
    dailyDeathArrayValues: Array,
    dates: Array,
  },
  data() {
    return {
      selectedType: "case",
      selectedRange: 30,
      aPush: [],
      chartOptions: {
        chart: {
          height: 500,
          zoomBySingleTouch: true,
          zoomType: "x",
          // spacing: [0, 0, 0, 0],
          backgroundColor: "rgba(0,0,0,0)"
          //   inverted: true,
        },
        series: [
          {
            name: "DAILY CASES",
            type: "column",
            // showInLegend: false,
            data: [],
            lineWidth: 5,
            color: "#0093ff",
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1,
              },
              stops: [
                [0, "#0093ff"],
                [1, "rgb(255 255 255 / 52%)"],
              ],
            },
          },
          {
            name: "AVG 7 days",
            type: "line",
            // dashStyle: "shortdot",
            data: [],
            lineWidth: 1,
            color: "#404040d9",
          },
        ],

        title: {
          text: "New Daily Stat",
          align: "left",
          margin: 24,
        },
        credits: {
          enabled: false,
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
        },
        legend: {
          enabled: false,
          layout: "horizontal",
          align: "right",
          verticalAlign: "top",
          floating: true,
          x: -40,
          y: 0,
        },
        tooltip: {
          crosshairs: true,
          // split: true,
          shared: true,
          borderRadius: 10,
          borderWidth: 1,
        },
        plotOptions: {
          areaspline: {
            fillOpacity: 0.2,
          },
          column: {
            borderRadius: 2,
            groupPadding: 0,
            // pointPadding: 0,
            
        }
          // pointStart: 2010,
        },
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                enabled: false,
              },
            },
          },
        ],
      },
    };
  },

  methods: {
    rangeClick(x) {
      this.selectedRange = x;
      let k = [];
      if (this.selectedType == "active") {
        k = this.dailyActiveArrayValues;
        this.chartOptions.series[0].color = "#ffa700";
        this.chartOptions.series[0].name = "Daily Active Cases";
      } else if (this.selectedType == "death") {
        k = this.dailyDeathArrayValues;
        this.chartOptions.series[0].color = "#d6172d";
        this.chartOptions.series[0].name = "Daily Death Cases";
      } else if (this.selectedType == "recover") {
        k = this.dailyRecoverArrayValues;
        this.chartOptions.series[0].name = "Daily Recovered Cases";
        this.chartOptions.series[0].color = "#17d66d";
      } else {
        k = this.dailyCaseArrayValues;
        this.chartOptions.series[0].name = "Daily Total Cases";
        this.chartOptions.series[0].color = "#0093ff";
      }

      this.chartOptions.series[0].data = k.slice(-this.selectedRange);
      this.chartOptions.series[1].data = this.avg(k).slice(-this.selectedRange);

      this.chartOptions.xAxis.categories = this.dates.slice(
        -this.selectedRange
      );
    },
    avg(arr) {
      const _ = require("lodash");
      this.aPush = [];
      arr.forEach((item, index) => {
        if (index >= 6) {
          let av = Math.floor(_.mean(arr.slice(index - 6, index + 1)));
          this.aPush.push(av);
        } else {
          this.aPush.push(item);
        }
      });
      return this.aPush;
    },

    typeClick(type = "case") {
      this.selectedType = type;
      // this.$emit("type", this.selectedType );
      this.rangeClick(this.selectedRange);
    },
  },
  computed: {},
  async created() {},
  updated() {
    this.rangeClick(this.selectedRange);
  },
};
</script>

<style scoped>
.btnGroup2 {
  top: -8px;
  right: 21px;
}
.btnGroup {
  top: -8px;
  left: 156px;
}
</style>
