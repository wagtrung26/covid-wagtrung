import { createStore } from 'vuex'
import * as api from "@/api";



export default createStore({
  state: {
    count:0,
    allCountries: [],
    userCountry:{},
    filterCountries:[]
  },
  getters: {
    count: state => state.count
  },
  mutations: {
    increase(state,x){
      state.count += x
    },
    ALL_COUNTRIES(state,x){
      state.allCountries = x
      console.log("  ALL_COUNTRIES ")
    },
    USER_COUNTRY(state,x){
      state.userCountry = x
      console.log(" USER_COUNTRY ")
    },
    // for WORLD Map
    F_COUNTRIES(state,type){
      console.log("types vuex",type)
      state.filterCountries = [];
      state.allCountries.forEach((item) => {
        let cCode = item.countryInfo.iso2;
        let k;
        if (cCode) {
          k = cCode.toLowerCase();
        }
        let cCases = item[type];
        let x = [k, cCases];
        state.filterCountries.push(x);
      });
    },
   


  },
  actions: {
    handle({commit}){
      // {commit, state, getters, mutations }
      commit('increase', 8)
    },

    getAllCountries({commit}, type){
      api.getAllCountries()
      .then(res => {
        commit('ALL_COUNTRIES', res.data)
      })
      .then(() => {
        commit('F_COUNTRIES', type)
      })
    },

    getUserCountry({commit}){
      api.yourCountry()
      .then(res => {
        commit('USER_COUNTRY', res)
      })
    }
  },
  modules: {
  }
})
