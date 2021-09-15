import { apiService } from '@/utils/request'
import { getUidToken } from './uidToken'

export const rollList = (data) => {
    return apiService({
        url: "/roll/list",
        method: 'get',
        params: data
    })
}

export const rollInfo = (data) => {
    return apiService({
        url: "/roll/info",
        method: 'get',
        params: data
    })
}

export const classifylist = (num) => {
    return apiService({
        url: "/roll/classifylist",
        method: 'get',
        params: num == 3 ? { classify: num, ...getUidToken() } : { classify: num, ...getUidToken }
    })
}

export const join = (data) => {
    return apiService({
        url: "/roll/join",
        method: 'post',
        data: { ...data, ...getUidToken() }
    })
}
