<template>
  <div
    class="sm:flex-1 w-full flex border-2 border-slate-300/30 dark:border-0 bg-white dark:bg-slate-700/30 dark:shadow-none p-6 rounded-2xl items-center justify-center"
  >
    <div class="w-fit mr-4" v-if="percent >= 0">
      <a-progress
        type="circle"
        :status="type"
        :percent="percentC"
        :width="110"
        :strokeWidth="8"
      >
        <template #format="percent">
          <span>
            <span v-if="subBot > 0">+</span> <span v-if="subBot < 0">-</span
            >{{ percent }}%</span
          >
        </template>
      </a-progress>
    </div>
    <div class="flex-1 prose prose-slate dark:prose-invert">
      <p
        class="text-left leading-snug font-semibold tracking-wider text-slate-500/80 dark:text-slate-400/80 text-xs uppercase mb-3 truncate"
      >
        {{ subTop }}
      </p>
      <h2
        class="text-left text-5xl font-semibold tracking-normal text-slate-900 dark:text-white mb-2"
      >
        {{ titleC }}
      </h2>
      <div
        v-if="subBot"
        class="bg-slate-200/50 p-2 px-3 text-slate-600 font-semibold dark:text-slate-500 dark:bg-slate-800/50 text-xs rounded-lg tracking-tight w-fit"
      >
        <span v-if="subBot > 0">+</span>{{ subBot }}
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters, mapMutations, mapActions } from "vuex";
import numeral from "numeral";

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
    type: [String, Number, null],
      //   default: 100,
    },
    percent: {
      type: [String, Number],
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
    titleC() {
      if (isNaN(this.title)) {
        return this.title;
      } else {
        return numeral(this.title).format("0,0");
      }
    },
    type() {
      return this.subBot < 0 ? "exception" : "active";
    },
     percentC() {
      return parseInt(this.percent)
    },
  },
  created() {},
  mounted() {},
  updated() {},
};
</script>

<style scoped></style>
