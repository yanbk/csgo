import { apiService } from '@/utils/request'
import { getUidToken } from './uidToken'

export const getConfig = (data) => {
    return apiService({
        url: "/pay/config",
        method: 'post',
        data: { ...data, ...getUidToken() }
    })
}

export const getOrder = (data) => {
    return apiService({
        url: "/pay/order",
        method: 'post',
        data
    })
}

export const payFinished = (data) => {
    return apiService({
        url: "/pay/finished",
        method: 'get',
        data
    })
}