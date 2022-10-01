<template>
  <div class="chart">
    <!-- <p>All times</p> -->
    <div class="btnGroup">
      <!-- <button class="btn" @click="loadCase">Last 30days</button> -->
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
    dailyRecoverArrayValues: Array,
    dailyDeathArrayValues: Array,
    dates: Array,
  },
  data() {
    return {
      selectedType: "case",
      allTimeCheck: false,
      chartOptions: {
        chart: {
          type: "area",
          // events: {
          //   load() {
          //     // Check all checkboxes on load
          //     const chart = this;
          //     chart.series.forEach((series) => {
          //       series.checkbox.checked = true;
          //       series.selected = true;
          //     });
          //   },
          // },
          zoomBySingleTouch: true,
          zoomType: "x",
          // margin: [0,10,0,10],
          spacing: [30, 40, 40, 40],
          //   margin: [10, 10, 10, 10],
          //   shadow: true,
          credits: {
            enabled: false,
          },
          //   inverted: true,
        },
        series: [
          {
            name: "NEW CASES",
            // showInLegend: false,
            data: [],
            lineWidth: 3,
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
        ],

        title: {
          text: "New Daily Stat",
          align: "left",
          margin: 24,
        },
        subtitle: {
          text: null,
        },
        yAxis: {
          title: {
            text: "people",
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
          floating: true,
          x: -40,
          y: 0,
          // borderWidth: 1,
        },
        tooltip: {
          crosshairs: true,
          split: true,
          //   shared: true,
          // backgroundColor: "#FCFFC5",
          // borderColor: "black",
          borderRadius: 10,
          borderWidth: 1,
        },
        plotOptions: {
          series: {
            // showCheckbox: true,
            // events: {
            //   checkboxClick() {
            //     if (this.visible) {
            //       this.hide();
            //     } else {
            //       this.show();
            //     }
            //   },
            //   legendItemClick(e) {
            //     const chart = e.target.chart,
            //       index = e.target.index;
            //     chart.series[index].checkbox.checked = this.selected =
            //       !this.visible;
            //   },
            // },
            label: {
              connectorAllowed: false,
            },
          },
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
      if (!this.allTimeCheck) {
        this.chartOptions.xAxis.categories = this.dates.slice(-30);
        if (this.selectedType == "case") {
          this.chartOptions.series[0].color = "#0093ff";
          this.chartOptions.series[0].fillColor.stops[0] = [0, "#0093ff"];
          this.chartOptions.series[0].data =
            this.dailyCaseArrayValues.slice(-30);
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
    await this.loadCase();
  },
  updated() {
    this.loadCase();
  },
};
</script>

<style scoped>
.chart {
  /* box-shadow: 0px 3px 20px rgb(124, 124, 124); */
  margin: 30px 0px 0;
  position: relative;
}
.btnGroup {
  position: absolute;
  top: 20px;
  left: 180px;
  z-index: 1;
}
.btnGroup2 {
  position: absolute;

  top: 20px;
  right: 80px;
  z-index: 1;
}
.btn {
  padding: 10px;
  background-color: rgb(229, 229, 229);
  border: none;
  margin-right: 5px;
  transition: all 0.5s;
  /* box-shadow: 0px 3px 20px rgb(124, 124, 124); */
}
.btn:hover {
  background-color: rgb(198, 198, 198);
}
.btn.active {
  background-color: rgb(15, 19, 47);
  color: #fff;
  /* border: 2px solid #333; */
}
</style>
