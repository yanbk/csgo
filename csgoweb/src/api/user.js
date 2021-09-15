import { passportService, apiService } from '@/utils/request'
import { getUidToken } from './uidToken'
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

export const bindmobile = (data) => {
    return passportService({
        url: "/mobile/bindmobile",
        method: 'post',
        data
    })
}

export const editnickname = (data) => {
    return passportService({
        url: "/user/editnickname",
        method: 'post',
        data: { ...data, ...getUidToken() }
    })
}

export const setPromocode = (data) => {
    return apiService({
        url: "/user/promocode",
        method: 'post',
        data
    })
}

export const getInfo = () => {
    return apiService({
        url: "/user/info",
        method: 'get',
        params: getUidToken()
    })
}

export const userItems = () => {
    return apiService({
        url: "/user/item",
        method: 'get',
        params: getUidToken()
    })
}

export const promoCode = (data) => {
    return apiService({
        url: "/user/promoCode",
        method: 'post',
        data: { ...data, ...getUidToken() }
    })
}

export const rebate = () => {
    return apiService({
        url: "/api/rebate",
        method: 'get'
    })
}

export const bindPromoCode = (data) => {
    return apiService({
        url: "/user/bindPromoCode",
        method: 'post',
        data: { ...data, ...getUidToken() }
    })
}

export const setSteamTradeOffer = (data) => {
    return apiService({
        url: "user/setSteamTradeOffer",
        method: 'post',
        data: { ...data, ...getUidToken() }
    })
}
