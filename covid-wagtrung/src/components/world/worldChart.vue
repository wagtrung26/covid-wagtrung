<template>
  <div>
    <!-- START-Template -->

    <highcharts
      :constructorType="'mapChart'"
      class="hc"
      :options="chartOptions"
      ref="chart"
    ></highcharts>

    <!-- <h2>{{ allCountries }}:</h2> -->

    <!-- END-Template -->
  </div>
</template>

<script>
// import { errorToaster } from "../../shared/service/ErrorHandler.js"
import Highcharts from "highcharts";
import Maps from "highcharts/modules/map";
import worldMap from "@highcharts/map-collection/custom/world.geo.json";

Maps(Highcharts);

export default {
  components: {},
  name: "worldChart",
  props: { allCountries: Array, vVal: String },
  data() {
    return {
      chartOptions: {
        chart: {
          map: worldMap,
          // margin: [0, 0, 0, 0],
          //    width: 100%,
          height: 800,
          backgroundColor: "rgba(0,0,0,0)"
        },
         credits: {
          enabled: false,
        },
        exporting: {
          enabled: false,

        },
        title: {
          text: "",
        },
        subtitle: {
          text: "",
        },
        legend: {
          enabled: true,
          layout: "horizontal",
          align: "center",
          verticalAlign: "top",
        },
        mapNavigation: {
          enabled: true,
          buttonOptions: {
            alignTo: "spacingBox",
          },
        },
        colorAxis: {
          min: null,
          max: null,
          minColor: "#b992ff",
          maxColor: "#39009f",
        },
        series: [
          {
            name: "Total Cases",
            states: {
              hover: {
                color: "#BADA55",
              },
            },
            dataLabels: {
              enabled: true,
              format: "{point.name}",
            },
            tooltip: {
              valueSuffix: " people",
            },
            allAreas: false,
          },
        ],
      },
    };
  },
  methods: {
    // changeMap() {
    //    this.$emit('changeMap', this.vVal)
    //   //  console.log(" emit changeMap ",this.vVal)
    // },
  },
  computed: {},
  updated() {

    this.chartOptions.series[0].data = this.allCountries;
    if (this.vVal == "deaths") {
      this.chartOptions.colorAxis.minColor = "#fc7979";
      this.chartOptions.colorAxis.maxColor = "#a00000";
    }
     else if (this.vVal == "recovered") {
      this.chartOptions.colorAxis.minColor = "#6fff74";
      this.chartOptions.colorAxis.maxColor = "#008505";
    }
    else{
      this.chartOptions.colorAxis.minColor = "#41c2ff";
      this.chartOptions.colorAxis.maxColor = "#003095";
    }
  },
};
</script>

<style lang="scss" scoped></style>
