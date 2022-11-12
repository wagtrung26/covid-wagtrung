<template>
  <div>
    <!-- START-Template -->
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

    <!-- END-Template -->
  </div>
</template>

<script>
// import { errorToaster } from "../../shared/service/ErrorHandler.js"
export default {
  components: {},
  name: "vacChart",
  props: {
    dailyCaseArrayValues: Array,
    // dailyRecoverArrayValues: Array,
    dailyDeathArrayValues: Array,
    dailyVaccineArrayValues: Array,
    dates: Array,
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: "areaspline",
          height: 450,
          zoomBySingleTouch: true,
          zoomType: "x",
          // spacing: [0, 40, 0, 40],
          backgroundColor: "rgba(0,0,0,0)"
        },
        title: {
          text: "",
          align: "left",
          // margin: 24,
        },

        credits: {
          enabled: false,
        },
        subtitle: {
          text: "",
        },
        accessibility: {
          point: {
            valueDescriptionFormat:
              "{index}. {point.category}, {point.y:,.1f} billions, {point.percentage:.1f}%.",
          },
        },
        xAxis: {
          categories: [],
          accessibility: {
            description: "days",
          },
        },
        yAxis: [
          {
            
            labels: {
              // format: "{value}%",
            },
            title: {
              enabled: true,
              text: ""
            },
            type: 'logarithmic', 
          },
          // {
          //   opposite: true,
          //   title: {
          //     text: "Deaths",
          //   },
          // },
        ],
        legend: {
          layout: "horizontal",
          align: "center",
          verticalAlign: "bottom",
          floating: false,
          // borderWidth: 1,
        },
        tooltip: {
          pointFormat:
            '<span style="color:{series.color}">{series.name}</span>:  ({point.y} people)<br/>',
          // split: true,
          //   <b>{point.percentage:.1f}%</b>
          shared: true,
        },
        plotOptions: {
          series: {
            lineWidth: 2,

            // pointStart: 1990,
          },
          areaspline: {
            // stacking: "percent",

            fillOpacity: 0.4,

            marker: {
              enabled: false,
            },
          },
        },
        series: [
          //   {
          //     name: "NEW RECOVERED",
          //     color: "#17d66d",
          //     data: [],
          //   },
          {
            name: "NEW VACCINES",
            color: "#9a0dd5",
            data: [],
          },
          {
            name: "NEW DEATHS",
            color: "#d6172d",
            data: [],
            // yAxis: 1
          },
          {
            name: "NEW CASES",
            color: "#0093ff",
            data: [],
            
          },
        ],
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
      //   this.chartOptions.series[0].data = this.dailyCaseArrayValues.slice(-31);
      //   this.chartOptions.series[1].data =this.dailyRecoverArrayValues.slice(-31);
      this.chartOptions.series[2].data = this.dailyCaseArrayValues.slice(parseInt(this.range));
      this.chartOptions.series[1].data = this.dailyDeathArrayValues.slice(parseInt(this.range));
      this.chartOptions.series[0].data = this.dailyVaccineArrayValues.slice(parseInt(this.range));
      this.chartOptions.xAxis.categories = this.dates.slice(parseInt(this.range));
    },
  },
  computed: {},
  watch: {
    dailyVaccineArrayValues() {
      this.sample();
    },
    range() {
      this.sample();
    },
  },
  created() {},
  updated() {
    this.sample();
  },
};
</script>

<style scoped></style>
