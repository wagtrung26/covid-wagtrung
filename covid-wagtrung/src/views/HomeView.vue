<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <helloWorld
      :yourCountry="yourCountry"
      :cprop="chaprop"
      propThang=" truyen ngay luon"
    />
  </div>
  <h2>hi</h2>
</template>

<script>
// @ is an alias to /src
import helloWorld from "@/components/HelloWorld.vue";
import * as api from "@/api";

export default {
  name: "HomeView",
  components: {
    helloWorld,
  },

  data() {
    return {
      chaprop: "cha truyen ne",
      yourCountry: {},
    };
  },

  computed: {
    // name() {
    //   return this.data
    // }
  },

  beforeCreate() {
    api
      .yourCountry()
      .then((data) => {
        this.yourCountry.name = data.countryName;
        this.yourCountry.code = data.countryCode;
        this.yourCountry.continent = data.continentName;
        this.yourCountry.ip = data.request;
        console.log(data.request);
        console.log(data);

      })
      .catch((error) => console.log("yourCountry issue: ", error));
  },
};
</script>
