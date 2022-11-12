<template>
  <div>
    <!-- START-Template -->
    <div class="flex justify-start my-4">
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
  name: "stackChart",
  props: {
    dailyActiveArrayValues: Array,
    dailyRecoverArrayValues: Array,
    dailyDeathArrayValues: Array,
    dates: Array,
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: "area",
          height: 400,
          zoomBySingleTouch: true,
          zoomType: "x",
          // spacing: [0, 0, 0, 0],
          backgroundColor: "rgba(0,0,0,0)",
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
        yAxis: {
          labels: {
            format: "{value}%",
          },
          title: {
            enabled: false,
          },
        },
        legend: {
          layout: "horizontal",
          align: "center",
          verticalAlign: "bottom",
          floating: false,
          // x: -40,
          // y: 0,
          // borderWidth: 1,
        },
        tooltip: {
          pointFormat:
            '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y} people)<br/>',
          // split: true,
          shared: true,
        },
        plotOptions: {
          series: {
            lineWidth: 5,

            // pointStart: 1990,
          },
          area: {
            stacking: "percent",
            fillOpacity: 0.7,
            groupPadding: 0,
            pointPadding: 0,

            marker: {
              enabled: false,
            },
          },
        },
        series: [
          {
            name: "NEW ACTIVE CASES",
            color: "rgb(0, 147, 255)",
            data: [],
          },
          {
            name: "NEW RECOVERED",
            color: "#17d66d",
            data: [],
          },
          {
            name: "NEW DEATHS",
            color: "#d6172d",
            data: [],
          },
          // {
          //   name: "NEW VACCINES",
          //   color: "#9a0dd5",
          //   data: [],
          // },
        ],
      },
      range: "-365",
    };
  },
  methods: {
    sample() {
      this.chartOptions.series[0].data = this.dailyActiveArrayValues.slice(parseInt(this.range))
      this.chartOptions.series[1].data = this.dailyRecoverArrayValues.slice(parseInt(this.range))
      this.chartOptions.series[2].data = this.dailyDeathArrayValues.slice(parseInt(this.range))

      this.chartOptions.xAxis.categories = this.dates.slice(parseInt(this.range));
    },
  },
  watch: {
    dailyActiveArrayValues() {
      this.sample();
    },
    range() {
      this.sample();
    },
  },
  computed: {},
};
</script>

<style scoped></style>
