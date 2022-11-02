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
            backgroundColor: "#EEE",
            innerRadius: "80%",
            outerRadius: "100%",
            shape: "arc",
          },
        },

        exporting: {
          enabled: false,
        },

        tooltip: {
          enabled: false,
        },

        // the value axis
        yAxis: {
          min: 0,
          max: 600000,
          title: {
            text: "",
          },
          stops: [
            [0, "#60da05"], // green
            [0.5, "#37ace3"], // yellow
            [1, "#e33737"], // red
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
            name: "RPM",
            data: [],
            dataLabels: {
              format:
                '<div style="text-align:center">' +
                '<span style="font-size:25px">{y}</span><br/>' +
                '<span style="font-size:12px;opacity:0.4">' +
                "People/1M" +
                "</span>" +
                "</div>",
            },
            tooltip: {
              valueSuffix: " revolutions/min",
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
