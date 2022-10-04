<template>
  <div>
    <!-- START-Template -->

    <!-- vb -vue base -->
    <!-- ie - if, else -->
    <!-- sto - setTimeOut -->
    <!--  cl - console.log -->

    <apexchart
      width="380"
      type="donut"
      :options="options"
      :series="series"
    ></apexchart>
    <!-- END-Template -->
  </div>
</template>

<script>
// import { errorToaster } from "../../shared/service/ErrorHandler.js"
export default {
  components: {},
  name: "donutChartApex",
  props: {},
  data() {
    return {
      options: {
        chart: {
          type: "donut",
          height: 700,
          width: "auto",
        },
    //     title: {

    // text: 'undefined',
    //     },
        legend: {
          show: true,
          position: "bottom",
          horizontalAlign: "center",
        },
        // dropShadow: {
        //   enabled: true,
        //   top: 0,
        //   left: 0,
        //   blur: 3,
        //   opacity: 0.5,
        // },
        labels: ["Total Cases", "Total Recovered", "Total Deaths"],
        colors: ['#0093ff', '#17d66d','#e73146'],
        plotOptions: {
          pie: {
            // size: 1000,
            customScale: 1,

            donut: {
              size: "60%",
              labels: {
                show: true,
                total: {
                  show: true,
                  showAlways: true,
                },
              },
            },
          },
        },
      },

      series: [44, 55, 41],
    };
  },
  methods: {
    sample() {},
  },
  computed: {},
  created() {},
  mounted() {},
};
</script>

<style lang="scss" scoped></style>
