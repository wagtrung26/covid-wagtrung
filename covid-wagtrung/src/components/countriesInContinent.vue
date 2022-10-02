<template>
  <h1>{{ viewCountry.name }} are in {{ viewCountry.continent }}</h1>
  <div v-for="(item, index) in continentArray" :key="index">
    <div class="flex">
      <img class="flag" :src="item.flag" alt="" />
      <div>{{ index }} - {{ item.name }} - {{ item.cases }}</div>
    </div>
  </div>
</template>

<script>
// import { errorToaster } from "../../shared/service/ErrorHandler.js"

export default {
  components: {},
  name: "countiesInContinent",
  props: { continentArray: Array, viewCountry: Object },

  data() {
    return {};
  },
  methods: {
    sample() {},
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
.flex {
  display: flex;
}
</style>
