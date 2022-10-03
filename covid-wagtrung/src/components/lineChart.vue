<template>
  <div>
    <!-- <p>All times</p> -->
    <highcharts :options="chartOptions" ref="chart"></highcharts>
  </div>
</template>

<script>
import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";
// areaspline;

exportingInit(Highcharts);

export default {
  components: {},
  name: "splineArea",
  props: {
    viewCountry: Object,
    caseArrayValues: Array,
    deathArrayValues: Array,
    recoverArrayValues: Array,
    dates: Array,
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: "areaspline",
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
          spacing: [40, 40, 40, 40],

          // shadow: true,
        },
        series: [
          {
            name: "TOTAL CASES",
            // showInLegend: false,
            data: [],
            lineWidth: 3,
            color: "#0093ff",
            // fillColor: {
            //   linearGradient: {
            //     x1: 0,
            //     y1: 0,
            //     x2: 0,
            //     y2: 1,
            //   },
            //   stops: [
            //     [0, '#0093ff'],
            //     [1, 'rgb(255 255 255 / 52%)'],
            //   ],
            // },
          },
          {
            name: "TOTAL DEATHS",
            data: [],
            lineWidth: 3,
            color: "#d6172d",
            // fillColor: {
            //   linearGradient: {
            //     x1: 0,
            //     y1: 0,
            //     x2: 0,
            //     y2: 1,
            //   },
            //   stops: [
            //     [0, '#d6172d'],
            //     [1, 'rgb(255 255 255 / 52%)'],
            //   ],
            // },
          },
          {
            name: "TOTAL RECOVERED",
            data: [],
            lineWidth: 3,
            color: "#17d66d",
            // fillColor: {
            //   linearGradient: {
            //     x1: 0,
            //     y1: 0,
            //     x2: 0,
            //     y2: 1,
            //   },
            //   stops: [
            //     [0, '#17d66d'],
            //     [1, 'rgb(255 255 255 / 52%)'],
            //   ],
            // },
          },
        ],

        title: {
          text: "Total Stat",
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
          shared: true,
          // split: true,
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
          area: {
            fillOpacity: 0.2,
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
      credits: {
        enabled: false,
      },
    };
  },

  methods: {
    addDataToLineChart() {
      this.chartOptions.series[0].data = this.caseArrayValues;
      this.chartOptions.series[1].data = this.deathArrayValues;
      this.chartOptions.series[2].data = this.recoverArrayValues;
      this.chartOptions.xAxis.categories = this.dates;
    },
  },
  computed: {},
  async created() {
    // await this.addDataToLineChart();
  },
  updated() {
    this.addDataToLineChart();
  },
};
</script>

<style scoped>
* {
  margin-top: 30px;
}
</style>
