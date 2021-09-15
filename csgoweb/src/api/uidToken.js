import { store } from '@/store'

export const getUidToken = () => {
    return {
        uid: store.state.user.csgoUid,
        login_jwt: store.state.user.csgoToken
    }
}