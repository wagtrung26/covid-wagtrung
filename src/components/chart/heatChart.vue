<template>
 <div class="flex justify-start mb-4">
      <div class="flexCen space-x-4">
        <h4 class="font-semibold text-base">Date Range:</h4>
        <a-select v-model:value="range" size="large" class="w-32">
          <a-select-option value="-70">Haft year</a-select-option>
          <a-select-option value="-365">This year</a-select-option>
          <a-select-option value="0">All time</a-select-option>
        </a-select>
      </div>
    </div>
    <highcharts class="hc" :options="chartOptions" ref="chart"></highcharts>
</template>

<script>
// import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  components: {},
  name: "heatC",
  props: {
    y: Array,
    x: Array
    // propSample: {
    //   type: String,
    //   default: "col-md-3",
    // },
  },
  data() {
    return {
        range: -70,
        chartOptions: {
            chart: {
        type: 'heatmap',
         zoomBySingleTouch: true,
          zoomType: "x",
          height: 500,
        // marginTop: 40,
        // marginBottom: 80,
        plotBorderWidth: 0
    },


    title: {
        text: ''
    },

    xAxis: {
        categories: [],
        enabled: true,
    },

    yAxis: {
        categories: ['SUN','MON', 'TUE', 'WED', 'THU', 'FRI','SAT',],
        title: null,
        reversed: true
    },

    accessibility: {
        point: {
            // descriptionFormatter: function (point) {
            //     var ix = point.index + 1,
            //         xName = getPointCategoryName(point, 'x'),
            //         yName = getPointCategoryName(point, 'y'),
            //         val = point.value;
            //     return ix + '. ' + xName + ' sales ' + yName + ', ' + val + '.';
            // }
        }
    },

    colorAxis: {
        min: 0,
        // max: 1000,
        minColor: '#a3d8ff',
        maxColor: '#0b8dec',
        // stops: [
        //     [0, '#22d54d'],
        //     [0.5, '#15bc97'],
        //     [1, '#0085b6']
        // ],
        startOnTick: false,
        endOnTick: false,
    },
  credits: {
          enabled: false,
        },
    legend: {
        enabled: true,
          layout: "horizontal",
          align: "center",
          verticalAlign: "bottom",
        // y: 25,
        // symbolHeight: 280
    },

    tooltip: {
        formatter: function () {
            return '<p"> Week:' + this.point.x + '<br></p><h2>' +
                this.point.value + '</h2> Cases <br>';
        }
    },

    series: [{
        name: 'cases',
        borderWidth: 1,
        data: [],
        dataLabels: {
            enabled: true,
            color: '#000000'
        }
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                yAxis: {
                    labels: {
                        formatter: function () {
                            return this.value.charAt(0);
                        }
                    }
                }
            }
        }]
    }
        }
    };
  },
  methods: {
    // VUEX-Method
    // ...mapMutations(["increase"]),
    // VUEX-Action
    // ...mapActions(["handle"]),
    // Method
    sample() {
      this.chartOptions.series[0].data = this.y.slice(this.range);
      this.chartOptions.xAxis.categories= this.x;

    },
  },
  computed: {
    // VUEX-State
    // ...mapGetters(["count"]),
    // Computed
    cSample() {
      return 0;
    },
  },
  created() {},
  mounted() {

  },
  updated() {
      this.sample()

  },
};
</script>

<style scoped></style>
