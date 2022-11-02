<template>
  <div class="container bg-white shadow-2xl shadow-slate-300/50 p-8 rounded-3xl">
      
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
            class="text-left text-base tracking-wider text-blue-500 uppercase mb-4"
          >
            {{subTop}}
          </p>
        </span>

        <h1
          class="text-left text-3xl font-semibold tracking-tight text-slate-900 sm:text-6xl"
        >
          {{title}}
        </h1>
        <p class="text-left text-xl text-gray-500 mb-9 mt-3">
          {{subBot}}
        </p>

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
