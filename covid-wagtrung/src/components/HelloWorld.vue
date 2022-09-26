<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h1>{{ cprop }}</h1>
  <h1>{{ propThang }}</h1>
  <h1>your country {{ yourCountry.name }}, ip: {{ yourCountry.ip }}</h1>
  <button @click="loadYourCountryName">click Load your Country name</button>

  <form action="submit">
    <input type="text" v-model="viewCountry" :placeholder="viewCountry" /> 
    <button>search</button>
  </form>
  <ul v-for="country, index in filteredAllCountries" :key="country.index">
    <li @click="viewCountry = country.name">
      <span>{{ index }} - </span>
      <img class="countryFlag" :src="country.flag" alt="">
      {{ country.name }}
    </li>
  </ul>
</template>

<script>
import * as api from "@/api";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "x",
  props: {
    cprop: String,
    propThang: String,
    yourCountry: Object,
    allCountries: Array,
  },
  data() {
    return {
      viewCountry: "",
    };
  },
  computed: {
    filteredAllCountries() {
      return this.allCountries.filter((x) => {
        // var namex = x.name;
        return x.name.toLowerCase().includes(this.viewCountry.toLowerCase());
      });
    },
  },
  methods: {
    loadYourCountryName() {
      api.loadCountryName(this.yourCountry.name);
    },
  },
  created() {
    this.loadYourCountryName();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li {
  cursor: pointer;
  ::hover {
    background-color: red;
  }
}
.countryFlag{
  width: 50px;
  height: auto;
}
</style>
