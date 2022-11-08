<template>
  <transition name="fade" appear>
    <div
      class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40"
      @click.self="closeModal"
      v-if="showModal"
    ></div>
  </transition>
  <transition name="pop" appear>
    <div
      v-if="showModal"
      class="fixed inset-0 m-auto max-w-[50%] max-h-max overflow-hidden bg-white z-50 p-8 rounded-3xl shadow-xl"
    >
      <!-- close btn -->
      <div
        class="absolute top-6 right-6 p-3 flexCen bg-slate-200/50 rounded-full hover:scale-110 transition"
        @click="closeModal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>

      <h2
        class="leading-relaxed text-left font-semibold tracking-tight text-slate-900 mb-4 sm:text-4xl"
      >
        {{ title }}
      </h2>

      <div class="max-h-96 overflow-y-auto mb-4"><slot /></div>

      <!-- <div class="flex justify-end mt-2" >
            <button>ok</button>
        </div> -->
    </div>
  </transition>
</template>

<script>
// import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  components: {},
  name: "modalC",
  props: {
    title: {
      type: String,
      default: "title",
    },
  },
  data() {
    return {
      showModal: true,
    };
  },
  methods: {
    // VUEX-Method
    // ...mapMutations(["increase"]),
    // VUEX-Action
    // ...mapActions(["handle"]),
    // Method
    closeModal() {
      this.showModal = false;
      this.$emit("closeModal");
    },
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.2s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.2s linear;
}

.pop-enter,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.2) translateY(-50%);
}
</style>
