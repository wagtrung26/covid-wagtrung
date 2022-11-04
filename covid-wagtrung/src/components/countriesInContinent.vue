<template>
  <!-- <h1 class=" textXl mb0 textLeft">
    {{ viewCountry.continent }}
    <span class="textX">({{ continentArray.length }} Countries)</span>
  </h1> -->

  <div class="flex flex-wrap space-x-8 mb-8">
    <div
      class="w-3/12 bg-white pt-6 border-2 border-slate-50 rounded-2xl shadow-2xl shadow-slate-400/20"
    >
      <h3
        class="text-left mb-3 ml-6 text-xl font-semibold tracking-tight text-slate-900"
      >
        Total {{ viewCountry.continent }}
      </h3>
      <donutChart :continentTotal="continentTotal" />
    </div>
    <div class="w-9/12 flex-1">
      <bar-chart
        :continentArray="continentArray"
        :viewCountry="viewCountry"
        @countryTopA="countryTopB"
      />
    </div>
  </div>

  <tableC :continentArray="continentArray" />

  <!-- <div v-for="(item, index) in continentArray" :key="index">
    <div class="flex">
      <img class="flag" :src="item.flag" alt="" />
      <div>{{ index }} - {{ item.name }} - {{ item.cases }}</div>
    </div>
  </div> -->
</template>

<script>
// import { errorToaster } from "../../shared/service/ErrorHandler.js"
import barChart from "@/components/barChart.vue";
import donutChart from "@/components/donutChart.vue";
import tableC from "@/components/comp/table.vue";

export default {
  components: { barChart, donutChart, tableC },
  name: "countiesInContinent",
  props: {
    continentArray: Array,
    viewCountry: Object,
    continentTotal: Object,
  },

  data() {
    return {
      // countryTopemit: 0,
    };
  },
  methods: {
    countryTopB(x) {
      let k = x + 1;
      this.$emit("countryTopB", k);
    },
  },
  computed: {},
  created() {},
  mounted() {},
};
</script>

<style scoped>
.flag {
  width: 150px;
}
</style>
