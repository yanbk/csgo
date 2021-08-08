import { apiService } from '@/utils/request'

export const boxList = () => {
    return apiService({
        url: "/box/list",
        method: 'post'
    })
}
export const boxInfo = (data) => {
    return apiService({
        url: "/box/info",
        method: 'get',
        params: data
    })
}


