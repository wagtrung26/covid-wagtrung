import { createStore } from 'vuex'
import * as api from "@/api";



export default createStore({
  state: {
    count:0,
    allCountries: [],
    userCountry:{}
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
    },
    USER_COUNTRY(state,x){
      state.userCountry = x
    }
  },
  actions: {
    handle({commit}){
      // {commit, state, getters, mutations }
      commit('increase', 8)
    },

    getAllCountries({commit}){
      api.getAllCountries()
      .then(res => {
        commit('ALL_COUNTRIES', res.data)
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
