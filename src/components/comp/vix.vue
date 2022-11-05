<template>
  <h3>this is VUE</h3>
</template>

<script>
// import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  components: {},
  name: "vueX",
  props: {
    // propSample: {
    //   type: String,
    //   default: "col-md-3",
    // },
  },
  data() {
    return {};
  },
  methods: {
    // VUEX-Method
    // ...mapMutations(["increase"]),
    // VUEX-Action
    // ...mapActions(["handle"]),
    // Method
    sample() {},
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
  mounted() {},
  updated() {},
};
</script>

<style scoped></style>
