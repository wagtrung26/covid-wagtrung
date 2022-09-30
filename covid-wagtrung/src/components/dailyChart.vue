<template>
  <div class="chart">
    <!-- <p>All times</p> -->
    <div class="btnGroup">
        <button class="btn"  @click="addDataToLineChart">Last 30days</button>
    <button class="btn" @click="cutTo">All time</button>
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
    dates: Array,
  },
  data() {
    return {
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
                [0, '#0093ff'],
                [1, 'rgb(255 255 255 / 52%)'],
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
        //   areaspline: {
        //     fillOpacity: 0.2,
        //   },
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
    addDataToLineChart() {
      this.chartOptions.series[0].data = this.dailyCaseArrayValues.slice(-30);
      this.chartOptions.xAxis.categories = this.dates.slice(-30);
    },
    cutTo(){
        this.chartOptions.series[0].data = this.dailyCaseArrayValues;
        this.chartOptions.xAxis.categories = this.dates.slice(1);
    }
  },
  computed: {},
  async created() {
    await this.addDataToLineChart()
  },
  updated() {this.addDataToLineChart()},
};
</script>

<style scoped>
.chart{
    /* box-shadow: 0px 3px 20px rgb(124, 124, 124); */
    margin: 30px 0px 0;
    position: relative;

}
.btnGroup{
    position: absolute;
    top: 20px;
    left: 180px;
    z-index: 1;

}
.btn{
    padding: 10px;
    background-color: rgb(229, 229, 229);
    border: none;
    margin-right: 5px;
    /* box-shadow: 0px 3px 20px rgb(124, 124, 124); */


}
.btn:hover{
    background-color: rgb(198, 198, 198);
    
}
</style>
