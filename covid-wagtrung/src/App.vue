<template>
  <div :class="{ dark: dark }">
    <div
      class="w-full bg-slate-200 dark:bg-slate-900 dark:text-white dark:text-"
    >
      <nav class="fixed top-0 w-full h-16 flex items-center justify-center backdrop-blur-lg z-20 ">
      <div class="flex-1 text-xl text-medium space-x-4">
        <router-link to="/">Country</router-link> 
        <router-link to="/worldwide">worldwide</router-link>
        </div>
        <div
          class="absolute left-8 top-4 bg-slate-300/50  rounded-full p-2 hover:bg-blue-500"
        >
          <a-switch class="" v-model:checked="this.dark">
            <template #checkedChildren
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-5 h-5 fill-white"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                  clip-rule="evenodd"
                />
              </svg>
            </template>
            <template #unCheckedChildren
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6 fill-white"
              >
                <path
                  d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"
                />
              </svg>
            </template>
          </a-switch>
        </div>
      </nav>
      <router-view class=""/>
    </div>
  </div>
</template>

<script>
// import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  components: {},
  name: "App",
  props: {
    // propSample: {
    //   type: String,
    //   default: "col-md-3",
    // },
  },
  data() {
    return { dark: false };
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

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: Poppins;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* overflow: hidden; */
}
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.textXl {
  font-size: 4rem;
}
.textX {
  font-size: 2rem;
}
.mx-30 {
  margin-left: 30px;
  margin-right: 30px;
}
.my-30 {
  margin-top: 30px;
  margin-bottom: 30px;
}
.my-0 {
  margin-top: 0px;
  margin-bottom: 0px;
}
.mr {
  margin: 0 0 0px 20px;
}
.MR-30 {
  margin-left: 30px;
}
.mb {
  margin: 0 0 20px 0px;
}
.mbL {
  margin-bottom: 40px;
}
.m0 {
  margin: 0px;
}
.p0 {
  padding: 0px;
}
.mb0 {
  margin-bottom: 0 !important;
}
.pl {
  padding-left: 40px;
}
.textLeft {
  text-align: left;
}
.chart {
  /* box-shadow: 0px 3px 20px rgb(124, 124, 124); */
  /* margin: 30px 0px 0; */
  position: relative;
}
.btnGroup {
  position: absolute;
  top: 20px;
  left: 180px;
  z-index: 1;
}
.btnGroup2 {
  position: absolute;

  top: 20px;
  right: 80px;
  z-index: 1;
}
.btn {
  padding: 10px;
  background-color: rgb(229, 229, 229);
  border: none;
  margin-right: 5px;
  transition: all 0.5s;
  /* box-shadow: 0px 3px 20px rgb(124, 124, 124); */
}
.btn:hover {
  background-color: rgb(198, 198, 198);
}
.btn.active {
  background-color: rgb(15, 19, 47);
  color: #fff;
  /* border: 2px solid #333; */
}
.flex {
  display: flex;
}
.flex0 {
  flex: 1;
}
.flex1 {
  flex: 1;
}
.flex3 {
  flex: 3;
}
.flex9 {
  flex: 9;
}
.flex5 {
  flex: 5;
}
.flex7 {
  flex: 7;
}
.containerF {
  width: 100%;
}

.flexC {
  display: flex;
  justify-content: center;
  align-items: center;
}
/* .rec h1{
  color: rgb(23, 214, 109)
}
.death h1{
  color: rgb(214, 23, 45)
}
.case h1{
  color: rgb(0, 147, 255)
} */
.rec,
.death,
.case {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
}
.stat {
  width: fit-content;
  margin: 0 auto;
  box-shadow: 0px 3px 20px rgba(124, 124, 124, 0.35);
  border-radius: 20px;
  padding: 20px 40px;
}
.stat-lg {
  font-size: 2.5rem;
  margin: 0;
}
.mr {
  margin-right: 50px;
}
</style>
