import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import user from './module/user.js'
import admin from './module/admin'
Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    modules: ['user']
})

export const store = new Vuex.Store({
    modules: {
        user,
        admin
    },
    plugins: [vuexLocal.plugin]
})