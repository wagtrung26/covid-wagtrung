<template>
  <div class="mainApp" :class="{ dark: dark }">
    <div
      class="w-full bg-slate-200 dark:bg-slate-900 dark:text-white dark:text-"
    >
      <nav id="nav" class="fixed m-0 top-0 w-full h-fit py-8 z-20">
        <div class="flexCen w-full h-full m-auto text-lg text-medium space-x-2">
          <router-link to="/">Country</router-link>

          <div class="h-16 relative" id="logo" @click="visible = true">
            <img class="w-full h-full" src="@/assets/fav.png" alt="" />
            <span
              class="animate-ping absolute inset-0 h-full w-full rounded-full border-2 border-emerald-400/20"
            ></span>
          </div>
          <router-link to="/worldwide">worldwide</router-link>
        </div>

        <div
          class="absolute right-8 top-4 bg-slate-300/50 rounded-full p-2 hover:bg-blue-500"
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

        <div
          class="progress-container backdrop-blur-xl absolute top-0 h-[5px] w-full"
        >
          <div
            class="progress-bar h-full bg-gradient-to-r from-sky-500 via-green-500 to-lime-500"
            id="myBar"
          ></div>
        </div>
      </nav>
      <a-drawer
        title="About this Web Application"
        placement="right"
        :closable="false"
        v-model:visible="visible"
       
      >
        <p></p>
        <h2>Covid-19 Data Visualization and Vaccination Efficiency</h2>
        <p>Author: <span class="font-semibold">WagTrung</span></p>
        <p>ID: <span class="font-semibold">ITITIU17087</span></p>
        <a-button href="https://disease.sh/docs/#/COVID-19%3A%20Worldometers/get_v3_covid_19_all">Data API</a-button>
      </a-drawer>

      <router-view />
      <!-- <vue-progress-bar></vue-progress-bar> -->
    </div>
  </div>
  <div id="components-back-top-demo-custom">
    <a-back-top>
      <div class="ant-back-top-inner">UP</div>
    </a-back-top>
  </div>
</template>

<script>
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
    return { dark: false, visible: false };
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
    // Computed
  },
  beforeCreate() {
    // this.$store.dispatch("getAllCountries")
    //  this.$store.dispatch("getUserCountry")
  },

  mounted() {
    window.onscroll = function () {
      myFunction();
    };

    function myFunction() {
      var winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      var height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      var scrolled = (winScroll / height) * 100;
      document.getElementById("myBar").style.width = scrolled + "%";

      if (
        document.body.scrollTop > 400 ||
        document.documentElement.scrollTop > 400
      ) {
        document.getElementById("nav").style.background = "#ffffffa1";
        document.getElementById("logo").style.height = "40px";
        document.getElementById("nav").style.padding = "16px 0";
        document.getElementById("nav").style.boxShadow =
          "3px 0px 27px #748ba84d";
        document.getElementById("nav").style.backdropFilter = "blur(24px)";
        document.getElementById("nav").style.position = "sticky";
      } else {
        document.getElementById("nav").style.background = "none";
        document.getElementById("logo").style.height = "64px";
        document.getElementById("nav").style.padding = "32px 0";

        document.getElementById("nav").style.boxShadow = "none";
        document.getElementById("nav").style.backdropFilter = "blur(0)";
        document.getElementById("nav").style.position = "absolute";
      }
    }
  },
};
</script>

<style>
.progress-bar {
  width: 0%;
}
#components-back-top-demo-custom .ant-back-top {
  bottom: 80px;
}
#components-back-top-demo-custom .ant-back-top-inner {
  height: 80px;
  width: 80px;
  line-height: 80px;
  border-radius: 50px;
  background-color: #11a665;
  color: #fff;
  text-align: center;
  font-size: 20px;
}

#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: Poppins;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #3c3f85;
  /* overflow: hidden; */
}
nav {
  /* padding: 30px; */
}

nav a {
  font-weight: 600;
  /* text-transform: uppercase; */
  /* letter-spacing: 1px; */
  color: #465769;
  padding: 8px;
  border-radius: 12px;
}

nav a.router-link-exact-active {
  color: #42b983;
  /* background-color: rgba(185, 185, 185, 0.116) */
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
