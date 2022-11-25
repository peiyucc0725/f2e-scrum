import { createStore } from 'vuex'

export const store = createStore({
  state () {
    return {
      step: 40
    }
  },
  actions: {
    setStep(context, status) {
      context.commit('SET_STEP', status)
    }
  },
  mutations: {
    SET_STEP(state, status) {
      state.step = status
    }
  }
})