<template>
  <div>
    <!-- START-Template -->

    <!-- vb -vue base -->
    <!-- ie - if, else -->
    <!-- sto - setTimeOut -->
    <!--  @click="allTime" :class="{ active: !allTimeCheck }-->

    <!-- <p>this is bar chart</p> -->
    <div class="chart " style="margin:0">
      

  <div class="flex justify-start my-4">
    <div class="sm:flexCen sm:items-end sm:justify-start sm:space-x-8 sm:mt-2 mt-4 sm:space-y-0 space-y-6 flex-wrap w-full">
      <div class="">
        <h4
          class="text-left font-semibold tracking-wider text-slate-400/70 text-xs uppercase mb-3"
        >
          Top countries
        </h4>
        <a-select v-model:value="sliceData" size="large" class="sm:w-48 w-full">
          <a-select-option value="top10">Top 10</a-select-option>
          <a-select-option value="all">All countries in {{ viewCountry.continent }}</a-select-option>
        </a-select>
      </div>

         <div class="">
        <h4
          class="text-left font-semibold tracking-wider text-slate-400/70 text-xs uppercase mb-3"
        >
          Case Type
        </h4>
        <a-select v-model:value="totalOrNew" size="large" class="sm:w-48 w-full">
          <a-select-option value="total">Total case</a-select-option>
          <a-select-option value="new">Today case</a-select-option>
        </a-select>
      </div>
     
    </div>

    
   
     
   
  </div>



      <highcharts :options="chartOptions" ref="chart"></highcharts>
    </div>

    <!-- END-Template -->
  </div>
</template>

<script>
// import { errorToaster } from "../../shared/service/ErrorHandler.js"
import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";
exportingInit(Highcharts);

export default {
  components: {},
  name: "barChart",
    emits: ["countryTopA"],
  props: {
    continentArray: Array,
    viewCountry: Object,
  },
  data() {
    return {
      sliceData: "top10",
      totalOrNew: "total",
      countryTop: "",
      //   continentCase: [],
      //   continentRecover: [],
      //   continentDeath: [],
      chartOptions: {
        chart: {
          type: "column",
          height: 440,
          // width: 800,
          zoomType: "x",
          // spacing: [0, 30, 0, 0],
          backgroundColor: "rgba(0,0,0,0)",
         
 
        },
        title: {
          text: "Continent Stat",
          align: "left",
          margin: 24,
        },
        subtitle: {
          text: "",
        },
        xAxis: {
          // tickLength: 0,
          scrollbar: {
            enabled: true,
            showFull: true,
          },
          categories: [],
          title: {
            text: null,
          },
          labels: {
            overflow: "justify",
            style: {
              fontSize: 16,
            },
          },
        },
        yAxis: {
          //         min: 0,
          // max: 10,

          scrollbar: {
            enabled: true,
            showFull: true,
          },
          title: {
            text: "",
            // align: "high",
          },
          labels: {
            overflow: "justify",
            style: {
              fontSize: 14,
            },
          },
        },
        tooltip: {
          valueSuffix: "",
          crosshairs: true,
          shared: true,
          borderRadius: 10,
          borderWidth: 1,
        },
        plotOptions: {
           series: {
			animation: false
		},
          column: {
            dataLabels: {
              enabled: true,
            },
          },
        },
        legend: {
          enabled: false,
          layout: "horizontal",
          align: "right",
          verticalAlign: "top",
          floating: true,
          x: -40,
          y: 0,
          borderWidth: 1,
          backgroundColor: "#FFFFFF",
          shadow: true,
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            name: "TOTAL CASES",
            color: "#0093ff",
          },
          { name: "TOTAL RECOVERED", color: "#17d66d" },
          { name: "TOTAL DEATHS", color: "#d6172d" },
        ],
      },
    };
  },
  methods: {
    sample() {
      const _ = require("lodash");

      let pushCase = [];
      let pushDeath = [];
      let pushRecover = [];

      let sortedCountries = _.orderBy(this.continentArray, ["cases"], ["desc"]);
      this.countryTop = _.findIndex(
        sortedCountries,
        (x) => x.name == this.viewCountry.name,
        0
      );
      this.$emit("countryTopA", this.countryTop);

      sortedCountries.forEach((i) => {
        if (this.totalOrNew == "total") {
          pushCase.push(i.cases);
          pushDeath.push(i.deaths);
          pushRecover.push(i.recovered);
        } else {
          //new case today case in that continent
          pushCase.push(i.todayCases);
          pushDeath.push(i.todayDeaths);
          pushRecover.push(i.todayRecovered);
        }
      });
      let xListCountriesName = sortedCountries.map((i) => i.name);

      //   this.continentCase = { name: "cases", data: pushCase };
      //   this.continentRecover = { name: "recovered", data: pushRecover };
      //   this.continentDeath = { name: "deaths", data: pushDeath };
      if (this.sliceData == "all") {
        //y
        this.chartOptions.series[0].data = pushCase;
        this.chartOptions.series[1].data = pushRecover;
        this.chartOptions.series[2].data = pushDeath;
        //x
        this.chartOptions.xAxis.categories = xListCountriesName;
      } else {
        //default load top10
        this.chartOptions.series[0].data = pushCase.slice(0, 10);
        this.chartOptions.series[1].data = pushRecover.slice(0, 10);
        this.chartOptions.series[2].data = pushDeath.slice(0, 10);
        this.chartOptions.xAxis.categories = xListCountriesName.slice(0, 10);
      }
    },
    // clickSliceData(x) {
    //   this.sliceData = x;
    //   this.addDataToBarChart();
    // },
    // clickTotalOrNew(x) {
    //   this.totalOrNew = x;
    //   this.addDataToBarChart();
    // },
  },
  computed: {},
  watch: {
     sliceData() {
      this.sample();
    },
    totalOrNew(){
      this.sample();
    },
    continentArray() {
      this.sample();
    },
  },
};
</script>

<style scoped>
.TL{
top:-10px;
left:140px
}
.TR{
top:-10px;
right:80px
}
</style>
