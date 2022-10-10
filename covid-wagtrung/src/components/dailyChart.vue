<template>
  <div class="chart">
    <div class="btnGroup">
      <button class="btn" @click="allTime" :class="{ active: !allTimeCheck }">
        30 days
      </button>
      <button class="btn" @click="allTime" :class="{ active: allTimeCheck }">
        All time
      </button>
    </div>

    <div class="btnGroup2">
      <button
        class="btn"
        @click="newCaseClick"
        :class="{ active: this.selectedType == 'case' }"
      >
        New Cases
      </button>
      <button
        class="btn"
        @click="newActiveClick"
        :class="{ active: this.selectedType == 'active' }"
      >
        Active Cases
      </button>
      <button
        class="btn"
        @click="newDeathClick"
        :class="{ active: this.selectedType == 'death' }"
      >
        New Deaths
      </button>
      <button
        class="btn"
        @click="newRecoverClick"
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
// import * as api from "@/api";

exportingInit(Highcharts);

export default {
  components: {},
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
      allTimeCheck: false,
      aPush:[],
      chartOptions: {
        chart: {
          type: "areaspline",
          height: 500,
          zoomBySingleTouch: true,
          zoomType: "x",
          // margin: [0,10,0,10],
          spacing: [0, 0, 0, 30],
          //   margin: [10, 10, 10, 10],
          //   shadow: true,
          credits: {
            enabled: false,
          },
          //   inverted: true,
        },
        series: [
          {
            name: "DAILY CASES",
            type: "area",
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
            dashStyle: "shortdot",
            data: [],
            lineWidth: 2,
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
          // backgroundColor: "#FCFFC5",
          // borderColor: "black",
          borderRadius: 10,
          borderWidth: 1,
        },
        plotOptions: {
          // series: {
          //   connectNulls: true,
            
          //   label: {
          //     connectorAllowed: true,
          //   },
          // },
          areaspline: {
            fillOpacity: 0.2,
          },
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
    loadCase() {
      const _ = require("lodash");

      if (!this.allTimeCheck) {
        this.chartOptions.xAxis.categories = this.dates.slice(-30);

        if (this.selectedType == "case") {
          this.chartOptions.series[0].color = "#0093ff";
          this.chartOptions.series[0].fillColor.stops[0] = [0, "#0093ff"];
          this.chartOptions.series[0].data =
            this.dailyCaseArrayValues.slice(-30);

          this.aPush=[]
          this.dailyCaseArrayValues.forEach((item, index) => {
            if (index >= 6) {

              let av = Math.floor(
                _.mean(this.dailyCaseArrayValues.slice(index - 6, index+1))
              );
              this.aPush.push(av);
            } else {
              this.aPush.push(0);
            }
          });
          // console.log(" something ", this.aPush);
          // console.log(" this.dailyCaseArrayValues ", this.dailyCaseArrayValues);

          this.chartOptions.series[1].data = this.aPush.slice(-30);
        } else if (this.selectedType == "active") {
          this.chartOptions.series[0].color = "#ffa700";
          this.chartOptions.series[0].fillColor.stops[0] = [0, "#ffa700"];
          this.chartOptions.series[0].data =
            this.dailyActiveArrayValues.slice(-30);
        } else if (this.selectedType == "death") {
          this.chartOptions.series[0].color = "#d6172d";
          this.chartOptions.series[0].fillColor.stops[0] = [0, "#d6172d"];
          this.chartOptions.series[0].data =
            this.dailyDeathArrayValues.slice(-30);
        } else {
          this.chartOptions.series[0].color = "#17d66d";
          this.chartOptions.series[0].fillColor.stops[0] = [0, "#17d66d"];
          this.chartOptions.series[0].data =
            this.dailyRecoverArrayValues.slice(-30);
        }
      } else {
        this.chartOptions.xAxis.categories = this.dates.slice(1);
        if (this.selectedType == "case") {
          this.chartOptions.series[0].color = "#0093ff";
          this.chartOptions.series[0].fillColor.stops[0] = [0, "#0093ff"];
          this.chartOptions.series[0].data = this.dailyCaseArrayValues;
          this.chartOptions.series[1].data = this.aPush
        } else if (this.selectedType == "active") {
          this.chartOptions.series[0].color = "#ffa700";
          this.chartOptions.series[0].fillColor.stops[0] = [0, "#ffa700"];
          this.chartOptions.series[0].data = this.dailyActiveArrayValues;
        } else if (this.selectedType == "death") {
          this.chartOptions.series[0].color = "#d6172d";
          this.chartOptions.series[0].fillColor.stops[0] = [0, "#d6172d"];
          this.chartOptions.series[0].data = this.dailyDeathArrayValues;
        } else {
          this.chartOptions.series[0].color = "#17d66d";
          this.chartOptions.series[0].fillColor.stops[0] = [0, "#17d66d"];
          this.chartOptions.series[0].data = this.dailyRecoverArrayValues;
        }
      }
    },
    newCaseClick() {
      this.selectedType = "case";
      this.loadCase();
    },
    newActiveClick() {
      this.selectedType = "active";
      this.loadCase();
    },
    newDeathClick() {
      this.selectedType = "death";
      this.loadCase();
    },
    newRecoverClick() {
      this.selectedType = "recover";
      this.loadCase();
    },
    allTime() {
      this.allTimeCheck = !this.allTimeCheck;
      this.loadCase();
      console.log(" this.allTimeCheck  ", this.allTimeCheck);
    },
  },
  computed: {},
  async created() {
    // await this.loadCase();
  },
  updated() {
    this.loadCase();
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
