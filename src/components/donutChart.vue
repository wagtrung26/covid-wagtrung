<template>
  <div>
    <!-- START-Template -->

    <!-- vb -vue base -->
    <!-- ie - if, else -->
    <!-- sto - setTimeOut -->
    <!--  cl - console.log -->
    <div class="pbar">
      <apexchart
        width="300"
        height="500"
        :options="options"
        :series="sample()"
      ></apexchart>
    </div>

<!-- <p> {{continentTotal}} </p> -->

    <!-- END-Template -->
  </div>
</template>

<script>
// radialBar vs donut"
export default {
  components: {},
  name: "donutChartApex",
  props: {continentTotal:Object},
  data() {
    return {
      options: {
        chart: {
          type: "donut",
          backgroundColor: "rgba(0,0,0,0)"
        },
        title: {
          // enabled: false,
          text: "",
          align: "left",
          style: {
            fontSize: "18px",
            fontWeight: "regular",
            fontFamily: "Lucida Grande",
            color: "#263238",
          },
        },
        grid: {
          // padding: {
          //   top: 30,
          //   right: 0,
          //   bottom: 0,
          //   left: 0,
          // },
        },
        legend: {
          show: true,
          position: "bottom",
          horizontalAlign: "left",
          itemMargin: {
            horizontal: 20,
            vertical: 5,
          },
        },
        // dropShadow: {
        //   enabled: true,
        //   top: 0,
        //   left: 0,
        //   blur: 3,
        //   opacity: 0.5,
        // },
        labels: ["Total Active", "Total Recovered", "Total Deaths"],
        colors: ["#ffa700", "#17d66d", "#e73146"],
        plotOptions: {
          // radialBar: {
          //   dataLabels: {
          //     name: {
          //       fontSize: "22px",
          //     },
          //     value: {
          //       fontSize: "16px",
          //     },
          //     total: {
          //       show: true,
          //       label: "Total Cases",
          //       formatter: function (w) {
          //         return w.globals.seriesTotals.reduce((a, b) => {
          //           return a + b;
          //         }, 0);
          //       },
          //     },
          //   },
          // },
          pie: {
            // size: 1000,
            customScale: 1,
            donut: {
              size: "75%",
              labels: {
                show: true,
                total: {
                  show: true,
                   label: "Continent's Total Cases",
                  showAlways: true,
                },
              },
            },
          },
        },
      },

      // series: [],
    };
  },
  methods: {
    sample() {
      let totalCase = this.continentTotal.active
      let totalRecover = this.continentTotal.recovered
      let totalDeath = this.continentTotal.deaths
      let series = [totalCase,totalRecover,totalDeath]
      return series
    },
  },
  computed: {},
  created() {},
  mounted() {},
};
</script>

<style scoped>
/* .pbar {
  margin: 0 20px 0 30px;
} */
</style>
