// import Cookie from 'js-cookie'
// import { formData } from '@/utils/form'
import { Message } from 'element-ui'
import { getInfo, userLogin, userReg } from '@/api/user'
const user = {
    namespaced: true,
    state: {
        csgoUid: '',
        csgoToken: '',
        userinfo: {}
    },
    mutations: {
        getSteamId(state, data) {
            state.steamid = data
        },
        SET_USERINFO: (state, data) => {
            state.userinfo = data
        },
        SET_UID: (state, data) => {
            state.csgoUid = data
        },
        SET_TOKEN: (state, data) => {
            state.csgoToken = data
        },
        LOGIN_OUT(state) {
            state.userinfo = {}
            state.csgoUid = ""
            state.csgoToken = ""
            sessionStorage.clear()
            // router.push({ name: 'login', replace: true })
            window.location.reload()
        },
        SET_NICKNAME: (state, data) => {
            state.userinfo.nickname = data
        },
        SET_PROMOCODE: (state, data) => {
            state.userinfo.promo_code = data
        }
    },
    actions: {
        getInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                console.log(state)
                getInfo().then(res => {
                    console.log(res)
                    if (res.errno == 0) {
                        commit('SET_USERINFO', res.data.user_info)
                    } else {
                        Message({
                            type: 'error',
                            message: res.errmsg
                        })
                    }
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        userLogin({ commit }, data) {
            return new Promise((resolve, reject) => {
                userLogin(data).then(res => {
                    if (res.errno == 0) {
                        commit('SET_UID', res.data.uid)
                        commit('SET_TOKEN', res.data.login_jwt)
                        // Cookie.set('uid', res.data.uid, {domain: 'csgogo.net'})
                        // Cookie.set('login_jwt', res.data.login_jwt, {domain: 'csgogo.net'})
                    }
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        userReg({ commit }, data) {
            return new Promise((resolve, reject) => {
                userReg(data).then(res => {
                    if (res.errno == 0) {
                        commit('SET_UID', res.data.uid)
                        commit('SET_TOKEN', res.data.login_jwt)
                    }
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        loginOut({ commit }) {
            commit('LOGIN_OUT')
        }
    },
    getters: {
        
    }
}
export default user