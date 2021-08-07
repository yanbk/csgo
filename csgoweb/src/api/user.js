import { passportService } from '@/utils/request'

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
        method: 'get',
        params: data
    })
}

export const editPassword = (data) => {
    return passportService({
        url: "/mobile/editpasswd",
        method: 'get',
        params: data
    })
}
