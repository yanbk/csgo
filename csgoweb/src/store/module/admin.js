
const user = {
    namespaced: true,
    state: {
        isLogin: false,
        msgObj: {
            show: false,
            type: 'info',
            message: ''
        }
    },
    mutations: {
        loginShow(state, data) {
            state.isLogin = data
        },
        showMessage(state, data) {
            state.msgObj = { ...state.msgObj, ...data }
        }
    },
    actions: {
        
    },
    getters: {
        
    }
}
export default user