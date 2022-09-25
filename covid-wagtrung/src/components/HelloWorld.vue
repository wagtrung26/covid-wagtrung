<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h1>{{ cprop }}</h1>
  <h1>{{ propThang }}</h1>
  <h1>your country {{ yourCountry.name }}, ip: {{ yourCountry.ip }}</h1>
  <button @click="clickLoadCountries">clickLoadCountries</button>
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
  },
  data() {
    return {};
  },
  methods: {
    clickLoadCountries() {
      api.loadCountryName(this.yourCountry.name);
    },
  },
  created() {
    api.loadCountryName(this.yourCountry.name);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
