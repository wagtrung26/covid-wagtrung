<template>
  <div>
    <h1>line</h1>
     <highcharts class="hc" :options="chartOptions" ref="chart"></highcharts>
  </div>
</template>

<script>
import Highcharts from 'highcharts'
import exportingInit from 'highcharts/modules/exporting'
exportingInit(Highcharts)

export default {
  components: {

  },
  name: "lineChart",
  props: {},
  data() {
    return {
       chartOptions: {
        series: [
          {
            data: [1, 2, 3]
          }
        ]
      }
      
    };
  },
  methods: {
  },
  computed: {},
  created() {},
  mounted() {},
};
</script>

<style lang="scss" scoped></style>
