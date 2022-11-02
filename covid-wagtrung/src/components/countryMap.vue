<template>
  <div>
    <!-- START-Template -->

    <!-- <p>countryMap</p> -->
    <!-- <p>{{viewCountry}}</p> -->
    <!-- <button @click="napus()">nap us</button> -->
    <highcharts
      :constructorType="'mapChart'"
      :options="chartOptions"
      class="hc"
      ref="chartRef"
    ></highcharts>

    <!-- END-Template -->
  </div>
</template>

<script>
import Highcharts from "highcharts";
import Maps from "highcharts/modules/map";
// import mapCountry from "@highcharts/map-collection/countries/vn/vn-all.geo.json";

Maps(Highcharts);

// import { errorToaster } from "../../shared/service/ErrorHandler.js"
// [
//                 ["vn-3655", 10],
//                 ["vn-qn", 11],
//                 ["vn-kh", 12],
//                 ["vn-tg", 13],
//                 ["vn-bv", 14],
//                 ["vn-bu", 15],
//                 ["vn-hc", 16],
//                 ["vn-br", 17],
//                 ["vn-st", 18],
//                 ["vn-pt", 19],
//                 ["vn-yb", 20],
//                 ["vn-hd", 21],
//                 ["vn-bn", 22],
//                 ["vn-317", 23],
//                 ["vn-nb", 24],
//                 ["vn-hm", 25],
//                 ["vn-ho", 26],
//                 ["vn-vc", 27],
//                 ["vn-318", 28],
//                 ["vn-bg", 29],
//                 ["vn-tb", 30],
//                 ["vn-ld", 31],
//                 ["vn-bp", 32],
//                 ["vn-py", 33],
//                 ["vn-bd", 34],
//                 ["vn-724", 35],
//                 ["vn-qg", 36],
//                 ["vn-331", 37],
//                 ["vn-dt", 38],
//                 ["vn-la", 39],
//                 ["vn-3623", 40],
//                 ["vn-337", 41],
//                 ["vn-bl", 42],
//                 ["vn-vl", 43],
//                 ["vn-tn", 44],
//                 ["vn-ty", 45],
//                 ["vn-li", 46],
//                 ["vn-311", 47],
//                 ["vn-hg", 48],
//                 ["vn-nd", 49],
//                 ["vn-328", 50],
//                 ["vn-na", 51],
//                 ["vn-qb", 52],
//                 ["vn-723", 53],
//                 ["vn-nt", 54],
//                 ["vn-6365", 55],
//                 ["vn-299", 56],
//                 ["vn-300", 57],
//                 ["vn-qt", 58],
//                 ["vn-tt", 59],
//                 ["vn-da", 60],
//                 ["vn-ag", 61],
//                 ["vn-cm", 62],
//                 ["vn-tv", 63],
//                 ["vn-cb", 64],
//                 ["vn-kg", 65],
//                 ["vn-lo", 66],
//                 ["vn-db", 67],
//                 ["vn-ls", 68],
//                 ["vn-th", 69],
//                 ["vn-307", 70],
//                 ["vn-tq", 71],
//                 ["vn-bi", 72],
//                 ["vn-333", 73],
//               ]
export default {
  components: {},
  name: "countryMap",
  props: { viewCountry: Object },
  data() {
    return {
      // chartOptions: {},
      chartOptions: {
        chart: {
          height: 500,
          zoomBySingleTouch: true,
          zoomType: "xy",
          // spacing: [0, 30, 0, 30],
          backgroundColor: "rgba(0,0,0,0)"
          
        },
        exporting:{
            enabled:false
          },
           legend: {
          layout: "vertical",
          align: "left",
          verticalAlign: "left",
          floating: true,
          x: 0,
          y: 80,
          // borderWidth: 1,
        },
        title: {
          text: "",
          // align: "left",
          // margin: 24,
        },
        credits: {
          enabled: false,
        },
        subtitle: {
          text: "",
        },
        mapNavigation: {
          enabled: true,
          buttonOptions: {
            verticalAlign: "top",
          },
        },
        colorAxis: {
          min: 0,
        },
        series: [
          {
            data: [
               ["vn-3655", 10],
            ["vn-qn", 11]],
            // mapData: mapCountry,
            name: "data",
            states: {
              hover: {
                color: "#BADA55",
              },
            },
            dataLabels: {
              enabled: true,
              format: "{point.name}",
            },
          },
        ],
      },
    };
  },
  methods: {
    napus(code) {
      import(
        `@highcharts/map-collection/countries/${code}/${code}-all.geo.json`
      ).then((res) => {
        this.chartOptions.series[0].mapData = res;
        let fakedata=[]
         res.features.forEach((feature, index) => {
          let newArray=[]
          newArray.push(feature.properties["hc-key"])
          newArray.push(index)
          fakedata.push(newArray)
        });
        this.chartOptions.series[0].data = fakedata
        // console.log(" fakedata ", fakedata)
        // this.$refs.chartRef.chart.mapData = res
        // console.log(" this.chartOptions.chart.map ",this.chartOptions.chart.map)
        // this.$refs.chartRef.options.series[0].update()
        // console.log(" this.$refs.chartRef.options.chart.map ", this.$refs.chartRef.options.chart.map )
        // console.log(" this.$refs.chartRef.options.series[0] ", this.$refs.chartRef.options.chart.map )
      });

    },
  
  },
  computed: {},
  mounted() {
    //  this.sample();
    // console.log(" Map a Country ");
  },
  updated() {
    this.napus(this.viewCountry.code.toLowerCase());
  },
};
</script>

<style lang="scss" scoped></style>
