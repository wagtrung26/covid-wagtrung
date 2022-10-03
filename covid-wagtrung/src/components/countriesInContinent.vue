<template>
 <h1 class="pl textXl mb0 textLeft">{{ viewCountry.continent }} ({{continentArray.length}})</h1> 
  <h3 class=" pl textLeft">Compare {{ viewCountry.name }} in its continent</h3>
  <bar-chart :continentArray="continentArray" :viewCountry="viewCountry"/>
  <div v-for="(item, index) in continentArray" :key="index">
    <div class="flex">
      <img class="flag" :src="item.flag" alt="" />
      <div>{{ index }} - {{ item.name }} - {{ item.cases }}</div>
    </div>
  </div>
</template>

<script>
// import { errorToaster } from "../../shared/service/ErrorHandler.js"
import barChart from "@/components/barChart.vue";

export default {
  components: { barChart },
  name: "countiesInContinent",
  props: {
    continentArray: Array,
    viewCountry: Object,
  },

  data() {
    return {};
  },
  methods: {},
  computed: {},
  created() {},
  mounted() {},
};
</script>

<style scoped>
.flag {
  width: 150px;
}
.flex {
  display: flex;
}
</style>
