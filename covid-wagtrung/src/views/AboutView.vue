<template>
  <div>
    <!-- START-Template -->
    <world-chart />

    <!-- END-Template -->
  </div>
</template>

<script>
import WorldChart from '@/components/worldChart.vue';
// import { errorToaster } from "../../shared/service/ErrorHandler.js"
export default {
  components: {WorldChart},
  name: "aboutView",
  props: {
  
  },
  data() {
    return {};
  },
  methods: {
    
  },
  computed: {},
  created() {},
  mounted() {},
};
</script>

<style lang="scss" scoped></style>
