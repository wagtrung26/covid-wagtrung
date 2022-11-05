<template>
  <div>
    <!-- START-Template -->

    <highcharts :options="chartOptions" ref="chart"></highcharts>

    <!-- END-Template -->
  </div>
</template>

<script>
import Highcharts from  "highcharts";
import highchartsMore from 'highcharts/highcharts-more';
import solidGauge from 'highcharts/modules/solid-gauge';

highchartsMore(Highcharts);
solidGauge(Highcharts);
// import { errorToaster } from "../../shared/service/ErrorHandler.js"
export default {
    
  components: {},
  name: "solidGauge",
  props: {
    val: Number,
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: "solidgauge",
          height: 300,
          backgroundColor: "rgba(0,0,0,0)",
        //   width:400
          
        },
        credits: {
            enabled: false,
          },

        title: "null",

        pane: {
          center: ["50%", "50%"],
          size: "100%",
          startAngle: -145,
          endAngle: 145,
          background: {
            backgroundColor: "#e2e8f0",
            innerRadius: "60%",
            outerRadius: "100%",
            shape: "arc",
          },
        },

        exporting: {
          enabled: false,
        },

        tooltip: {
          enabled: true,
        },

        // the value axis
        yAxis: {
          min: 0,
          max: 600000,
          title: {
            text: "",
          },
          stops: [
            [0, "#3bdf39"], // green
            [0.5, "#37ace3"], // yellow
            [1, "#df3955"], // red
            // [0.6, "#e81f17"], // green
            // [0.8, "#9f17e8"], // yellow
            // [1, "#3417e8"], // red
          ],
          lineWidth: 0,
          tickWidth: 0,
          minorTickInterval: null,
          tickAmount: 10,

          labels: {
            y: 16,
          },
        },

        plotOptions: {
          solidgauge: {
            dataLabels: {
              y: 5,
              borderWidth: 0,
              useHTML: true,
            },
          },
        },

        series: [
          {
            name: "",
            data: [],
            dataLabels: {
              format:
                '<div style="text-align:center; margin-top:-30px">' +
                '<span style="font-size:25px; color:#333">{y}</span><br/>' +
                '<span style="font-size:12px;color:#333;opacity:0.4">' +
                "Cases/1M people" +
                "</span>" +
                "</div>",
            },
            tooltip: {
              valueSuffix: " Cases / 1 Million people",
            },
          },
        ],
      },
    };
  },
  
  methods: {
    sample() {},
  },
  computed: {},
  created() {},
  updated() {
    let x = []
    x.push(this.val)
    this.chartOptions.series[0].data = x

  },
};


</script>

<style scoped></style>
