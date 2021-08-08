import Cookie from 'js-cookie'
import { formData } from '@/utils/form'
import { getInfo } from '@/api/user'
const user = {
    namespaced: true,
    state: {
        csgoUid: Cookie.get('csgo_uid'),
        csgoToken: Cookie.get('csgo_login_jwt'),
        userinfo: {}
    },
    mutations: {
        getSteamId(state, data) {
            state.steamid = data
        },
        SET_USERINFO: (state, data) => {
            state.userinfo = data
        }
    },
    actions: {
        getInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getInfo(formData({ uid: state.csgoUid, login_jwt: state.csgoToken })).then(res => {
                    commit('SET_USERINFO', res.data.user_info)
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