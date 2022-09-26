<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h1>{{ cprop }}</h1>
  <h1>{{ propThang }}</h1>
  <h1>your country {{ yourCountry.name }}, ip: {{ yourCountry.ip }}</h1>
  <button @click="loadYourCountryName">click Load your Country name</button>

  <ul v-for="country in allCountries" :key="country.index">
    <li >
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
    return {};
  },
  methods: {
    loadYourCountryName() {
      api.loadCountryName(this.yourCountry.name);
    },
  },
  created() {
    this.loadYourCountryName()
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
