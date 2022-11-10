<template>
  <modal title="Select a country" @closeModal="closeModal">
    <div class="searchSelectCountry">
      <div class="">
        <div class="flex flex-wrap w-full bg-white items-end sticky z-10 top-0">
          <input
            class="flex-1 bg-white shadow-lg px-5 py-4 w-full text-xl"
            type="text"
            v-model="vModelCountry"
            placeholder="Type a country's name"
          />
          <a-select
            ref="select"
            v-model:value="type"
            size="large"
            class="w-3/12"
          >
            <a-select-option value="cases">Cases</a-select-option>
            <a-select-option value="deaths">Deaths</a-select-option>
            <a-select-option value="recovered">Recovered</a-select-option>
            <a-select-option value="todayCases">Today Cases</a-select-option>
            <a-select-option value="todayDeaths">Today Deaths</a-select-option>
          </a-select>
        </div>

        <div class="listCountriesSelect" v-if="allCountries">
          <ul
            v-for="(country, index) in filteredAllCountries"
            :key="index"
            class="odd:bg-white even:bg-slate-100"
          >
            <li @click="countryClickComp(country)">
              <div class="flex items-center justify-between pr-4">
                <!-- left -->
                <div class="flex items-center justify-around">
                  <span
                    class="flexCen ml-4 p-3 h-1 w-1 bg-slate-900/70 text-white rounded text-xs mr-4"
                    >{{ index + 1 }}</span
                  >
                  <img
                    class="h-9 mr-2 [clip-path:circle()]"
                    :src="country.flag"
                    alt=""
                  />
                  <div>
                    <h4
                      class="text-base leading-relaxed font-semibold tracking-tight text-slate-900"
                    >
                      {{ country.name }}
                    </h4>
                    <p>{{ country.continent }}</p>
                  </div>
                </div>
                <!-- right -->
                <div>
                  {{ numF(country[type]) }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
// import { mapGetters, mapMutations, mapActions } from "vuex";
import modal from "@/components/comp/modal.vue";
import numeral from "numeral";

export default {
  components: { modal },
  name: "selectCountry",
  props: {
    allCountries: Array,
    viewCountry: Object,
    // propSample: {
    //   type: String,
    //   default: "col-md-3",
    // },
  },
  data() {
    return {
      vModelCountry: "",
      type: "cases",
      // clicked: false,
      code: null,
      //   seachOn: false,
    };
  },
  methods: {
    // VUEX-Method
    // ...mapMutations(["increase"]),
    // VUEX-Action
    // ...mapActions(["handle"]),
    // Method
    numF(num) {
      return numeral(num).format("0,0");
    },
    closeModal() {
      //   this.seachOn = false;
      this.$emit("searchOff");
    },
    countryClickComp(country) {
      this.code = country.code;
      // this.$emit("countryClickComp", code);
      // this.clicked =true
      //   this.vModelCountry = "";
    },
  },
  computed: {
    filteredAllCountries() {
      const _ = require("lodash");

      let countries = this.allCountries;
      let sortedCountries = _.orderBy(countries, [this.type], ["desc"]);
      // console.log(sortedCountries);

      return sortedCountries.filter((country) => {
        var countryN = country.name.toLowerCase(),
          vModel = this.vModelCountry.toLowerCase();
        return countryN.startsWith(vModel);
      });
    },
    // VUEX-State
    // ...mapGetters(["count"]),
    // Computed
  },
    watch:{
      code(){
       this.closeModal();
      this.$emit("countryClickComp", this.code);

      }
    },
  created() {},
  mounted() {},
  updated() {},
};
</script>

<style scoped>
ul {
  margin: 0;
  padding: 0;
}
li {
  cursor: pointer;
  list-style: none;
  padding: 20px 10px;
  text-align: left;
}
li:hover {
  background-color: #ddd;
}
</style>
