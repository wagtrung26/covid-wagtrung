<template>
  <div
    class=" bg-white shadow-2xl shadow-slate-400/60 sm:p-12 p-4 py-8 sm:mx-12 mx-0 rounded-2xl dark:bg-slate-800 dark:shadow-none"
  >
    <div class="flex flex-wrap flex-start space-x-10 mb-4 ">
      <div class="w-full">
        <span class="w-full inline-flex items-baseline justify-center sm:justify-start" v-if="subTop">
          <span class="relative flex h-4 w-4 mr-2">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"
            ></span>
            <span
              class="relative inline-flex  rounded-full h-2 w-2 mt-1 ml-1 bg-sky-500"
            ></span>
          </span>
          <p
            class=" sm:text-sm sm:text-left text-xs tracking-wider font-semibold text-blue-500 uppercase mb-4"
          >
            {{ subTop }}
          </p>
        </span>
        <h1
          class="sm:leading-tight sm:text-left text-center text-5xl font-semibold tracking-tight text-slate-900 mb-4 sm:text-6xl dark:text-white"
        >
          {{ title }}
        </h1>
        <p class="text-left text-base text-slate-600 ">
          <!-- {{ subBot }} -->
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

};
</script>

<style scoped></style>
