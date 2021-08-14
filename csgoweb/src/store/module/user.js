// import Cookie from 'js-cookie'
// import { formData } from '@/utils/form'
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
    },
    actions: {
        getInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                console.log(state)
                getInfo({ uid: state.csgoUid, login_jwt: state.csgoToken }).then(res => {
                    console.log(res)
                    commit('SET_USERINFO', res.data.user_info)
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
        }
    },
    getters: {
        
    }
}
export default user