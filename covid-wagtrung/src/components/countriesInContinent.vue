<template>
  <h1 class="pl textXl mb0 textLeft">
    {{ viewCountry.continent }}
    <span class="textX">({{ continentArray.length }} Countries)</span>
  </h1>
  <h3 class="pl textLeft mbL">
    <span class="textX"> {{ viewCountry.name }}</span> is in
    <span class="textX">Top {{ countryTopemit }}</span> in
    {{ viewCountry.continent }}
  </h3>

  <div class="flex mb">
    <div class="flex3">
      <donutChart :continentTotal="continentTotal" />
    </div>
    <div class="flex9">
      <bar-chart
        :continentArray="continentArray"
        :viewCountry="viewCountry"
        @emitCountryTop="setemitCountryTop"
      />
    </div>
  </div>

    <tableC :continentArray="continentArray"/>


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
   
  components: { barChart, donutChart, tableC,},
  name: "countiesInContinent",
  props: {
    continentArray: Array,
    viewCountry: Object,
    continentTotal: Object,
  },

  data() {
    return {
      countryTopemit: 0,
    };
  },
  methods: {
    setemitCountryTop(x) {
      this.countryTopemit = x + 1;
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
