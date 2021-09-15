import { apiService } from '@/utils/request'
import { getUidToken } from './uidToken'

export const boxList = () => {
    return apiService({
        url: "/box/list",
        method: 'get'
    })
}
export const boxInfo = (data) => {
    return apiService({
        url: "/box/info",
        method: 'get',
        params: data
    })
}
export const dropList = (data) => {
    return apiService({
        url: "/api/list",
        method: 'get',
        params: data
    })
}

export const boxRunning = (data) => {
    return apiService({
        url: "/box/running",
        method: 'post',
        data: { ...data, ...getUidToken() }
    })
}

export const boxSell = (data) => {
    return apiService({
        url: "/box/sell",
        method: 'post',
        data: { ...data, ...getUidToken() }
    })
}


