import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import user from './module/user.js'
Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    modules: ['user']
})

export const store = new Vuex.Store({
    modules: {
        user
    },
    plugins: [vuexLocal.plugin]
})