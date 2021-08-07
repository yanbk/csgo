
const user = {
    namespaced: true,
    state: {
        isLogin: false
    },
    mutations: {
        loginShow(state, data) {
            state.isLogin = data
        }
    },
    actions: {
        
    },
    getters: {
        
    }
}
export default user