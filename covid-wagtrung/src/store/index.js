import { createStore } from 'vuex'

export default createStore({
  state: {
    count:0
  },
  getters: {
    count: state => state.count
  },
  mutations: {
    increase(state,x){
      state.count += x
    }
  },
  actions: {
    handle({commit}){
      // {commit, state, getters, mutations }
      commit('increase', 8)
    }
  },
  modules: {
  }
})
