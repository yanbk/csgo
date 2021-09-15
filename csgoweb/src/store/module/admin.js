
const user = {
    namespaced: true,
    state: {
        isLogin: false,
        isActive: false
    },
    mutations: {
        loginShow(state, data) {
            state.isLogin = data
        },
        activeShow(state, data) {
            state.isActive = data
        }
    },
    actions: {
        
    },
    getters: {
        
    }
}
export default user