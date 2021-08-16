import { apiService } from '@/utils/request'

export const getConfig = (data) => {
    return apiService({
        url: "/pay/config",
        method: 'post',
        data
    })
}

export const getOrder = (data) => {
    return apiService({
        url: "/pay/order",
        method: 'post',
        data
    })
}