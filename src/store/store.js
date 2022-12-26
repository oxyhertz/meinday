import Vuex from 'vuex'

import { userStore } from './user.store.js'
import { carStore } from './car.store.js'
import { reviewStore } from './review.store.js'
import { boardStore } from './board.store.js'

export const store = Vuex.createStore({
  strict: true,
  modules: {
    userStore,
    carStore,
    reviewStore,
    boardStore,
  },
  state: {},
  mutations: {},
  actions: {},
})
