<template>
  <h3>this is VUE</h3>
  <highcharts class="hc" :options="chartOptions" ref="chart"></highcharts>
</template>

<script>
// import { mapGetters, mapMutations, mapActions } from "vuex";
import Highcharts from "highcharts";
import drilldown from "highcharts/modules/drilldown";

drilldown(Highcharts);

export default {
  components: {},
  name: "drillColumn",
  props: {
    continentDrill: Array,
    Asia: Array,
    Europe: Array,
    Africa: Array,
    NorthAmerica: Array,
    SouthAmerica: Array,
    Oceania: Array,
    // propSample: {
    //   type: String,
    //   default: "col-md-3",
    // },
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: "bar",
          height: 500,
          backgroundColor: "rgba(0,0,0,0)"
        },
        credits: {
          enabled: false,
        },
        exporting: {
          enabled: false,
        },
        title: {
          align: "left",
          text: "",
        },
        subtitle: {
          align: "left",
          text: "",
        },
        accessibility: {
          announceNewData: {
            enabled: true,
          },
        },
        xAxis: {
          type: "category",
        },
        yAxis: {
          title: {
            text: "",
          },
        },
        legend: {
          enabled: false,
        },
        plotOptions: {
          bar: {
            
            groupPadding: 0,
            // pointPadding: 0,
          },
          series: {
            borderWidth: 0,
            // borderRadiusTopLeft: "50%",
            // borderRadiusTopRight: "50%",
            dataLabels: {
              enabled: false,
              format: "{point.y}",
            },
          },
        },

        tooltip: {
          headerFormat: "<h1>{series.name}</h1><br>",
          pointFormat:
            '<span style="color:{point.color}">{point.name}</span> <h1>{point.y}</h1> cases<br/>',
        },

        series: [
          {
            name: "Continents",
            colorByPoint: true,
            // data: [
            //   {
            //     name: "Asia",
            //     y: 63.06,
            //     drilldown: "Asia",
            //   },
            //   {
            //     name: "Europe",
            //     y: 19.84,
            //     drilldown: "Europe",
            //   },
            //   {
            //     name: "Africa",
            //     y: 4.18,
            //     drilldown: "Africa",
            //   },
            //   {
            //     name: "NorthAmerica",
            //     y: 4.12,
            //     drilldown: "NorthAmerica",
            //   },
            //   {
            //     name: "SouthAmerica",
            //     y: 2.33,
            //     drilldown: "SouthAmerica",
            //   },
            //   {
            //     name: "Oceania",
            //     y: 0.45,
            //     drilldown: "Oceania",
            //   },
            // //   {
            // //     name: "Other",
            // //     y: 1.582,
            // //     drilldown: null,
            // //   },
            // ],
          },
        ],
        drilldown: {
          breadcrumbs: {
            position: {
              align: "right",
            },
          },
          series: [
            {
              name: "Europe",
              id: "Europe",
              //   data: [
              //     ["v65.0", 0.1],
              //     ["v64.0", 1.3],
              //     ["v63.0", 53.02],
              //     ["v62.0", 1.4],
              //     ["v61.0", 0.88],
              //     ["v60.0", 0.56],
              //     ["v59.0", 0.45],
              //     ["v58.0", 0.49],
              //     ["v57.0", 0.32],
              //     ["v56.0", 0.29],
              //     ["v55.0", 0.79],
              //     ["v54.0", 0.18],
              //     ["v51.0", 0.13],
              //     ["v49.0", 2.16],
              //     ["v48.0", 0.13],
              //     ["v47.0", 0.11],
              //     ["v43.0", 0.17],
              //     ["v29.0", 0.26],
              //   ],
            },
            {
              name: "Asia",
              id: "Asia",
              //   data: [
              //     ["v58.0", 1.02],
              //     ["v57.0", 7.36],
              //     ["v56.0", 0.35],
              //     ["v55.0", 0.11],
              //     ["v54.0", 0.1],
              //     ["v52.0", 0.95],
              //     ["v51.0", 0.15],
              //     ["v50.0", 0.1],
              //     ["v48.0", 0.31],
              //     ["v47.0", 0.12],
              //   ],
            },
            {
              name: "North America",
              id: "North America",
              //   data: [
              //     ["v11.0", 6.2],
              //     ["v10.0", 0.29],
              //     ["v9.0", 0.27],
              //     ["v8.0", 0.47],
              //   ],
            },
            {
              name: "South America",
              id: "South America",
              //   data: [
              //     ["v11.0", 3.39],
              //     ["v10.1", 0.96],
              //     ["v10.0", 0.36],
              //     ["v9.1", 0.54],
              //     ["v9.0", 0.13],
              //     ["v5.1", 0.2],
              //   ],
            },
            {
              name: "Australia-Oceania",
              id: "Australia-Oceania",
              //   data: [
              //     ["v16", 2.6],
              //     ["v15", 0.92],
              //     ["v14", 0.4],
              //     ["v13", 0.1],
              //   ],
            },
            {
              name: "Africa",
              id: "Africa",
              //   data: [
              //     ["v50.0", 0.96],
              //     ["v49.0", 0.82],
              //     ["v12.1", 0.14],
              //   ],
            },
          ],
        },
      },
    };
  },
  methods: {
    // VUEX-Method
    // ...mapMutations(["increase"]),
    // VUEX-Action
    // ...mapActions(["handle"]),
    // Method
    sample() {},
  },
  computed: {
    // VUEX-State
    // ...mapGetters(["count"]),
    // Computed
  },
  created() {},
  mounted() {},
  updated() {
    this.chartOptions.series[0].data = this.continentDrill;
    this.chartOptions.drilldown.series[0].data = this.Europe;
    this.chartOptions.drilldown.series[1].data = this.Asia;
    this.chartOptions.drilldown.series[2].data = this.NorthAmerica;
    this.chartOptions.drilldown.series[3].data = this.SouthAmerica;
    this.chartOptions.drilldown.series[4].data = this.Oceania;
    this.chartOptions.drilldown.series[5].data = this.Africa;
  },
};
</script>

<style scoped></style>
