<template>
  <div>
    <!-- <p>All times</p> -->
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
            <a-select-option value="-35">This month</a-select-option>
            <a-select-option value="-70">Haft year</a-select-option>
            <a-select-option value="-365">This year</a-select-option>
            <a-select-option value="0">All time</a-select-option>
          </a-select>
        </div>
      </div>
    </div>
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
    vaccineArrayValues: Array,
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: "areaspline",
          height: 450,
          zoomBySingleTouch: true,
          zoomType: "x",
          // margin: [0,10,0,10],
          // spacing: [0, 0, 0, 0],
          backgroundColor: "rgba(0,0,0,0)",
        },
        series: [
          {
            name: "TOTAL CASES",
            // type: 'column',
            data: [],
            lineWidth: 3,
            color: "#0093ff",
          },
          {
            name: "TOTAL DEATHS",
            // type: 'column',
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
            // type: 'column',
            data: [],
            lineWidth: 3,
            color: "#17d66d",
          },
          {
            name: "TOTAL VACCINES",
            type: "spline",
            data: [],
            lineWidth: 3,
            color: "#9a0dd5",
            dashStyle: "shortdot",
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
          // crosshair: true,
          type: "logarithmic",
          //  minorTickInterval: "auto",
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
      range: '-365',
    };
  },

  methods: {
    sample() {
      this.chartOptions.series[0].data = this.caseArrayValues.slice(this.range);
      this.chartOptions.series[1].data = this.deathArrayValues.slice(
        this.range
      );
      this.chartOptions.series[2].data = this.recoverArrayValues.slice(
        this.range
      );
      // this.chartOptions.series[3].data = this.vaccineArrayValues;

      // console.log(" newVaccineArrayValues ",newVaccineArrayValues)
      if (this.vaccineArrayValues) {
        this.chartOptions.series[3].data = this.vaccineArrayValues.slice(this.range);
      }

      this.chartOptions.xAxis.categories = this.dates.slice(this.range);
    },
  },
  computed: {},
   watch: {
    caseArrayValues() {
      this.sample();
    },
    range() {
      this.sample();
    },
  },


};
</script>

<style scoped>
* {
  /* margin-top: 30px; */
}
</style>
