<template>
  <div class="flex justify-start mb-6">
    <div
      class="sm:flexCen sm:items-end sm:justify-start sm:space-x-8 sm:mt-2 mt-4 sm:space-y-0 space-y-6 flex-wrap w-full"
    >
      <div class="">
        <h4
          class="text-left font-semibold tracking-wider text-slate-400/70 text-xs uppercase mb-3"
        >
          Date Range
        </h4>
        <a-select v-model:value="range" size="large" class="sm:w-48 w-full">
          <a-select-option value="-30">This month</a-select-option>
          <a-select-option value="-70">Haft year</a-select-option>
          <a-select-option value="-365">This year</a-select-option>
          <a-select-option value="0">All time</a-select-option>
        </a-select>
      </div>
      <div class="c">
        <h4
          class="text-left font-semibold tracking-wider text-slate-400/70 text-xs uppercase mb-3"
        >
          Case Type
        </h4>
        <a-select v-model:value="type" size="large" class="sm:w-48 w-full">
          <a-select-option value="cases">Daily Cases</a-select-option>
          <a-select-option value="deaths">Daily Deaths</a-select-option>
          <a-select-option value="recover">Used Recovered</a-select-option>
          <a-select-option value="active">Daily Active</a-select-option>
        </a-select>
      </div>
    </div>
  </div>
  <highcharts class="hc" :options="chartOptions" ref="chart"></highcharts>
</template>

<script>
import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";

exportingInit(Highcharts);

export default {
  components: {},
  name: "lineChart",
  props: {
    y: Array,
    dates: Array,
  },
  data() {
    return {
      type: "cases",
      range: "-30",
      aPush: [],
      chartOptions: {
        chart: {
          height: 450,
          zoomBySingleTouch: true,
          zoomType: "x",
          // spacing: [50, 0, 0, 0],
          // spacingTop: 60,
          backgroundColor: "rgba(0,0,0,0)",
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
          text: "",
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
          //     type: 'datetime',
          // labels: {
          //   format: '{value:%d-%m-%Y}',
          // }
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
          series: {},
          areaspline: {
            fillOpacity: 0.2,
          },
          column: {
            borderRadius: 2,
            groupPadding: 0,
            // pointPadding: 0,
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
    sample() {
      this.chartOptions.series[0].data = this.y.slice(parseInt(this.range));
      this.chartOptions.series[1].data = this.avg(this.y).slice(
        parseInt(this.range)
      );
      this.chartOptions.xAxis.categories = this.dates.slice(
        parseInt(this.range)
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
  },

  watch: {
    y() {
      this.sample();
    },
    range() {
      this.sample();
    },
    type() {
      this.$emit("type", this.type);
      if (this.type == "active") {
        this.chartOptions.series[0].color = "#ffa700";
        this.chartOptions.series[0].name = "Daily Active Cases";
      } else if (this.type == "deaths") {
        this.chartOptions.series[0].color = "#d6172d";
        this.chartOptions.series[0].name = "Daily Death Cases";
      } else if (this.type == "recover") {
        this.chartOptions.series[0].name = "Daily Recovered Cases";
        this.chartOptions.series[0].color = "#17d66d";
      } else {
        this.chartOptions.series[0].name = "Daily Total Cases";
        this.chartOptions.series[0].color = "#0093ff";
      }
      // console.log(" emit type Heat chart ",this.type)
    },
  },
};
</script>

<style scoped>
.btnGroup2 {
  top: -8px;
  right: 0px;
}
.btnGroup {
  top: -8px;
  left: 0px;
}
</style>
