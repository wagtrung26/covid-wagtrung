<template>
  <div
    class="flex-1 flex shadow-2xl shadow-slate-500/20 bg-white p-8 rounded-2xl items-center justify-center"
  >
    <div class="w-fit mr-4">
      <a-progress
        type="circle"
        :status="type"
        :percent="`${percent}`"
        :width="110"
        :strokeWidth="8"
        v-if="percent >= 0"
      >
       <template #format="percent">
        <span> <span v-if="subBot>0">+</span> <span v-if="subBot<0">-</span>{{ percent }}%</span>
      </template>
      </a-progress>
    </div>
    <div class="flex-1">
      <p class="text-left text-sm text-slate-500 mb-3">{{ subTop }}</p>
      <h2
        class="text-left text-5xl font-semibold tracking-tight text-slate-900 mb-2"
      >
        {{ title }}
      </h2>
      <div
      v-if="subBot"
        class="bg-slate-200/30 p-1 px-2 text-slate-600 text-xs rounded-2xl tracking-wider font-normal w-fit"
      >
        <span v-if="subBot>0">+ </span>
        {{ subBot }}
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  components: {},
  name: "cardC",
  props: {
    title: {
      //   type: Number,
      default: 100,
    },
    subTop: {
      type: String,
      default: "subTop",
    },
    subBot: {
      //   type: Number,
    //   default: 100,
    },
    percent: {
      type: Number,
    //   default: 60,
    },
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
    type() {
      return this.subBot<0 ? "exception": "";
    },
  },
  created() {},
  mounted() {},
  updated() {},
};
</script>

<style scoped></style>
