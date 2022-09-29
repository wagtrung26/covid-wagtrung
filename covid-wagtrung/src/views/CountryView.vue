<!-- eslint-disable no-unused-vars -->
<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <statCard
      :allCountries="allCountries"
      :yourCountryCode="yourCountryCode"
      :viewCountry="viewCountry"
      @countryClickComp="countryClick"
    />

    <lineChart
      :caseArrayValues="caseArrayValues"
      :deathArrayValues="deathArrayValues"
      :recoverArrayValues="recoverArrayValues"
      :dates="dates"
      :chartOptions="chartOptions"
    ></lineChart>
  </div>
</template>

<script>
// @ is an alias to /src
import * as api from "@/api";
import statCard from "@/components/statCard.vue";
import lineChart from "@/components/lineChart.vue";

export default {
  name: "CountryView",
  components: {
    statCard,
    lineChart,
  },

  data() {
    return {
      allCountries: [],
      yourCountryCode: "",
      viewCountry: {},
      caseArrayValues: [],
      deathArrayValues: [],
      recoverArrayValues: [],
      dates: [],
      chartOptions: {
        chart: {
          type: "spline",
          zoomBySingleTouch: true,
          zoomType: "x",
        },
        series: [
          {
            name: "CASES",
            data: [],
            lineWidth: 2,
            color: "#0093ff",
          },
          {
            name: "DEATHS",
            data: [],
            lineWidth: 2,
            color: "#d6172d",
          },
          {
            name: "RECOVERED",
            data: [],
            lineWidth: 2,
            color: "#17d66d",
          },
        ],

        title: {
          text: "",
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
          align: "center",
          verticalAlign: "top",
        },
        tooltip: {
          crosshairs: true,
          shared: true,
          // backgroundColor: "#FCFFC5",
          // borderColor: "black",
          borderRadius: 10,
          borderWidth: 1,
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false,
            },
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
      },
    };
  },

  methods: {
    countryClick(countryCode) {
      try {
        if (countryCode) {
          var country = this.allCountries.find((i) => i.code === countryCode);
          this.viewCountry = country;
          api
            .getHistoricalCountry(this.viewCountry.code)
            .then((res) => {
              let listTimeline = res.data.timeline;
              console.log(" something ", listTimeline);
              //yAxis
              this.caseArrayValues = Object.values(listTimeline.cases);
              this.deathArrayValues = Object.values(listTimeline.deaths);
              this.recoverArrayValues = Object.values(listTimeline.recovered);

              //xAsis
              this.dates = Object.keys(listTimeline.cases);

              this.chartOptions.series[0].data = this.caseArrayValues;
              this.chartOptions.series[1].data = this.deathArrayValues;
              this.chartOptions.series[2].data = this.recoverArrayValues;
              this.chartOptions.xAxis.categories = this.dates;
            })
            .catch((e) => console.log(" something ", e));
        }
        this.vModelCountry = "";
      } catch (error) {
        console.log("countryClick err", error);
      }
    },
  },

  computed: {
    // name() {
    //   return this.data
    // }
  },
  watch: {
    viewCountry() {
      return this.viewCountry;
    },
  },

  async created() {
    // 1. get All countries
    try {
      let ArrayCountries = await api.getAllCountries();
      let rawArrayCountries = ArrayCountries.data;
      let filteredArrayCountries = rawArrayCountries.map((countryItem) => {
        return {
          name: countryItem.country,
          code: countryItem.countryInfo.iso2,
          flag: countryItem.countryInfo.flag,
          ...countryItem,
        };
      });

      this.allCountries = filteredArrayCountries;
      console.log(" 1 this.allCountries ");
    } catch (e) {
      console.log(" allCountries err ", e);
    }

    // 2. get user country based on browser IP, at the beginning state
    try {
      let yourCountry = await api.yourCountry();
      this.yourCountryCode = yourCountry.countryCode;
      console.log("2 this.yourCountryCode  ", this.yourCountryCode);
    } catch (error) {
      console.log(" error yourCountryCode ", error);
    }

    // 3. check country to render
    if (this.yourCountryCode) {
      this.countryClick(this.yourCountryCode);
      console.log(" 3 check Countrycode to render");
    }

    //4.
    try {
      let getHistoricalCountry = await api.getHistoricalCountry(
        this.viewCountry.code
      );

      let listTimeline = getHistoricalCountry.data.timeline;

      //yAxis
      this.caseArrayValues = Object.values(listTimeline.cases);
      this.deathArrayValues = Object.values(listTimeline.deaths);
      this.recoverArrayValues = Object.values(listTimeline.recovered);

      //xAsis
      this.dates = Object.keys(listTimeline.cases);

      this.chartOptions.series[0].data = this.caseArrayValues.slice(-365);
      this.chartOptions.series[1].data = this.deathArrayValues.slice(-365);
      this.chartOptions.series[2].data = this.recoverArrayValues.slice(-365);
      this.chartOptions.xAxis.categories = this.dates.slice(-365);

      console.log(" 4 linechart countryView ");
    } catch (error) {
      console.log(" error linechart countryView ", error);
    }
  },
  async updated() {
    // try {
    //   let getHistoricalCountry = await api.getHistoricalCountry(
    //     this.viewCountry.code
    //   );
    //   let listTimeline = getHistoricalCountry.data.timeline;
    //   let caseArray = listTimeline.cases;
    //   let deathArray = listTimeline.deaths;
    //   let recoverArray = listTimeline.recovered;
    //   //yAxis
    //   this.caseArrayValues = Object.values(caseArray);
    //   this.deathArrayValues = Object.values(deathArray);
    //   this.recoverArrayValues = Object.values(recoverArray);
    //   //xAsis
    //   this.dates = Object.keys(caseArray);
    //   this.chartOptions.series[0].data = this.caseArrayValues;
    //   this.chartOptions.series[1].data = this.deathArrayValues;
    //   this.chartOptions.series[2].data = this.recoverArrayValues;
    //   this.chartOptions.xAxis.categories = this.dates;
    //   console.log(" 4 linechart country ");
    // } catch (error) {
    //   console.log(" error linechart country ", error);
    // }
  },
};
</script>
