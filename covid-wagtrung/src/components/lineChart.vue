<template>
  <div>
    <h1>line</h1>
     <highcharts  :options="chartOptions" ref="chart"></highcharts>
  </div>
</template>

<script>
import Highcharts from 'highcharts'
import exportingInit from 'highcharts/modules/exporting'
exportingInit(Highcharts)

export default {
  components: {

  },
  name: "lineChart",
  props: {},
  data() {
    return {
       chartOptions: {
        series: [
          {
            name: "cases",
            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
          },
          {
            name: "deaths",
            data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
          },
          {
            name: "recovered",
            data: [916, 22064, 11742, 29851, 42490, 35282, 8121, 90434]
          },
        ],

        title: {
          text: "All time"
        },
        subtitle: {
          text: null
        },
        yAxis: {
          title: {
            text: "people"
          }
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "top"
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            },
            pointStart: 2010
          }
        },
      }
      
    };
  },
  methods: {
  },
  computed: {},
  created() {},
  mounted() {},
};
</script>

<style lang="scss" scoped></style>
