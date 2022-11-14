<template>
  <div class="flex justify-start my-4">
    <div class="sm:flexCen sm:items-end sm:justify-start sm:space-x-8 sm:mt-2 mt-4 sm:space-y-0 space-y-6 flex-wrap w-full">
      <div class="">
        <h4
          class="text-left font-semibold tracking-wider text-slate-400/70 text-xs uppercase mb-3"
        >
          Date Range
        </h4>
        <a-select v-model:value="range" size="large" class="sm:w-48 w-full">
          <a-select-option value="-35">This month</a-select-option>
          <a-select-option value="-70">Haft year</a-select-option>
          <a-select-option value="-365">This year</a-select-option>
          <a-select-option value="0">All time</a-select-option>
        </a-select>
      </div>
      <div class="c">
        <h4
          class="text-left font-semibold tracking-wider text-slate-400/70 text-xs uppercase mb-3"
        >
          Case Type
        </h4>
        <a-select v-model:value="type" size="large" class="sm:w-48 w-full">
          <a-select-option value="cases">Daily Cases</a-select-option>
          <a-select-option value="deaths">Daily Deaths</a-select-option>
          <a-select-option value="vaccine">Used Vaccines</a-select-option>
        </a-select>
      </div>
    </div>
  </div>
  <highcharts class="hc" :options="chartOptions" ref="chart"></highcharts>
</template>

<script>
// import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  components: {},
  name: "heatC",
   emits: ["type"],
  props: {
    y: Array,
    x: Array,
    // propSample: {
    //   type: String,
    //   default: "col-md-3",
    // },
  },
  data() {
    return {
      range: "-70",
      type: "cases",
      load: false,
      chartOptions: {
        chart: {
          type: "heatmap",
          zoomBySingleTouch: true,
          zoomType: "x",
          height: 450,
          // paddingTop: 40,
          // marginBottom: 80,
          plotBorderWidth: 0,
          backgroundColor: "rgba(0,0,0,0)"
        },
         responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                legend: {
                  align: "center",
                  verticalAlign: "bottom",
                  layout: "horizontal",
                },
                yAxis: {
                  labels: {
                    align: "left",
                    x: 0,
                    y: 0,
                  },
                  title: {
                    text: null,
                  },
                },
                subtitle: {
                  text: null,
                },
                credits: {
                  enabled: false,
                },
              },
            },
          ],
        },

        title: {
          text: "",
        },
      

        xAxis: {
          categories: [],
          enabled: true,
        },

        yAxis: {
          categories: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
          title: null,
          reversed: true,
        },

         accessibility: {
    enabled: false
  },

        colorAxis: {
          min: 0,
          // max: 1000,
          minColor: "#a3d8ff",
          maxColor: "#0b8dec",
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
            return (
              '<p"> Week:' +
              this.point.x +
              "<br></p><h2>" +
              this.point.value +
              "</h2> Cases <br>"
            );
          },
        },

        series: [
          {
            name: "cases",
            // borderWidth: 1,
            data: [],
            dataLabels: {
              enabled: true,
              color: "#000000",
            },
          },
        ],

      
      },
    };
  },
  methods: {
    // VUEX-Method
    // ...mapMutations(["increase"]),
    // VUEX-Action
    // ...mapActions(["handle"]),
    // Method
    sample() {
      this.chartOptions.series[0].data = this.y.slice(parseInt(this.range));
      this.chartOptions.xAxis.categories = this.x.slice(parseInt(this.range));
    },
  },
  computed: {
    // VUEX-State
    // ...mapGetters(["count"]),
    // Computed
  },
  watch: {
    y() {
      this.sample();
    },
    range() {
      this.sample();
    },
    type() {
      this.$emit("type", this.type);
      if (this.type == "deaths") {
        this.chartOptions.colorAxis.minColor = "#f79ba6";
        this.chartOptions.colorAxis.maxColor = "#d6172d";
      } else if (this.type == "vaccine") {
        {
          this.chartOptions.colorAxis.minColor = "#d79eee";
          this.chartOptions.colorAxis.maxColor = "#9200cf";
        }
      } else {
        {
          this.chartOptions.colorAxis.minColor = "#a3d8ff";
          this.chartOptions.colorAxis.maxColor = "#0b8dec";
        }
      }
      // console.log(" emit type Heat chart ",this.type)
    },
  },
};
</script>

<style scoped></style>
