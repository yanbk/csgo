import { passportService, apiService } from '@/utils/request'

export const getSms = (data) => {
    return passportService({
        url: "/mobile/sms",
        method: 'get',
        params: data
    })
}

export const userReg = (data) => {
    return passportService({
        url: "/mobile/reg",
        method: 'get',
        params: data
    })
}

export const userLogin = (data) => {
    return passportService({
        url: "/mobile/login",
        method: 'post',
        data
    })
}

export const editPassword = (data) => {
    return passportService({
        url: "/mobile/editpasswd",
        method: 'get',
        params: data
    })
}

export const getInfo = (data) => {
    return apiService({
        url: "/user/info",
        method: 'post',
        data
    })
}
