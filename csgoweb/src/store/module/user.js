
const user = {
    namespaced: true,
    state: {
        steamid: '22222'
    },
    mutations: {
        getSteamId(state, data) {
            state.steamid = data
        }
    },
    actions: {
        
    },
    getters: {
        
    }
}
export default user