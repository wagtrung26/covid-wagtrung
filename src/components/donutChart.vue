<template>
  <div>
    <!-- START-Template -->

    <!-- vb -vue base -->
    <!-- ie - if, else -->
    <!-- sto - setTimeOut -->
    <!--  cl - console.log -->
    <div class="pbar">
      <highcharts :options="options"></highcharts>

      <!-- <apexchart
        width="300"
        height="500"
        :options="options"
        :series="sample()"
      ></apexchart> -->
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
  props: { continentTotal: Object },
  data() {
    return {
      options: {
        chart: {
          type: "pie",
            // height: 450,
          zoomBySingleTouch: true,
          zoomType: "x",
          // margin: [0,10,0,10],
          // spacing: [0, 0, 0, 0],
          backgroundColor: "rgba(0,0,0,0)",
        },
         credits: {
          enabled: false,
        },
         exporting:{
            enabled:false
          },
        title: {
          text: "",
        },
        tooltip: {
          headerFormat: "",
          // pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
          //     'Area (square km): <b>{point.y}</b><br/>' +
          //     'Population density (people per square km): <b>{point.z}</b><br/>'
        },
        plotOptions: {
     
         pie: {
           shadow: false,
            center: ['50%', '50%'],
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    
        series: [
          {
            minPointSize: 10,
            zMin: 0,
            name: "Total",
            size: '90%',
        innerSize: '70%',
            data: [
              {
                name: "Active cases",
                color: "#21a1ff",
                y: 505992,
                z: 92,
              },
              {
                name: "Recovered",
                y: 551695,
                color: "#44da45",
                z: 119,
              },
              {
                name: "Deaths",
                y: 312679,
                color: "#ec3131",

                z: 121,
              },
            ],
          },
        ],
      },

      // series: [],
    };
  },
  methods: {
    sample() {
      let totalCase = this.continentTotal.active;
      let totalRecover = this.continentTotal.recovered;
      let totalDeath = this.continentTotal.deaths;
      this.options.series[0].data[0].y = totalCase;
      this.options.series[0].data[1].y = totalRecover;
      this.options.series[0].data[2].y = totalDeath;
    },
  },
  watch: {
    continentTotal() {
      this.sample();
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
