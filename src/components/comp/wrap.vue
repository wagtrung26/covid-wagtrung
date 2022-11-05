<template>
  <div
    class="container bg-white shadow-2xl shadow-slate-300/50 p-12 rounded-3xl"
  >
    <div class="flex flex-wrap flex-start space-x-10 mb-16">
      <div class="w-max">
        <span class="w-full inline-flex items-baseline" v-if="subTop">
          <span class="relative flex h-4 w-4 mr-2">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"
            ></span>
            <span
              class="relative inline-flex rounded-full h-2 w-2 mt-1 ml-1 bg-sky-500"
            ></span>
          </span>
          <p
            class="text-left text-sm tracking-wider font-semibold text-blue-500 uppercase mb-4"
          >
            {{ subTop }}
          </p>
        </span>
        <h1
          class="leading-relaxed text-left text-3xl font-semibold tracking-tight text-slate-900 mb-4 sm:text-6xl"
        >
          {{ title }}
        </h1>
        <p class="text-left text-xl text-slate-600 ">
          {{ subBot }}
        </p>
      </div>
      <div class="flex-1 flex flex-start item-center">
        <slot name="right" />
      </div>
    </div>

    <slot />
  </div>
</template>

<script>
// import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  components: {},
  name: "wrapC",
  props: {
    subTop: {
      //   type: String,
      default: null,
    },
    title: {
      type: String,
      default: "Title",
    },
    subBot: {
      type: String,
      default: "subbot",
    },
  },
  data() {
    return {};
  },
  methods: {
    sample() {},
  },
  computed: {
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
