import request from '@/utils/request'

export function boxtype(data) {
  return request({
    url: '/box/boxtype',
    method: 'get',
    params: data
  })
}

export function boxtypeadd(data) {
  return request({
    url: '/box/boxtype',
    method: 'post',
    data
  })
}

export function boxtypedel(data) {
  return request({
    url: '/box/boxtypedel/' + data,
    method: 'get'
  })
}

export function boxtypemod(data) {
  return request({
    url: '/box/boxtypemod/' + data.get('id'),
    method: 'post',
    data
  })
}

export function boxconfig(data) {
  return request({
    url: '/box/boxconfig',
    method: 'get',
    params: data
  })
}

export function boxconfigadd(data) {
  return request({
    url: '/box/boxconfig',
    method: 'post',
    data
  })
}

export function boxconfigmod(data) {
  return request({
    url: '/box/boxconfigmod/' + data.get('id'),
    method: 'post',
    data
  })
}

export function boxconfigdel(data) {
  return request({
    url: '/box/boxconfigdel/' + data,
    method: 'get'
  })
}

export function boxitemlist(data) {
  return request({
    url: '/box/boxitemlist/' + data,
    method: 'get'
  })
}

export function boxitemsearch(data) {
  return request({
    url: '/box/boxitemsearch',
    method: 'post',
    data
  })
}

export function searchtype() {
  return request({
    url: '/box/searchtype',
    method: 'get'
  })
}

export function boxitemset(data) {
  return request({
    url: '/box/boxitemset',
    method: 'post',
    data
  })
}

export function boxitemdel(data) {
  return request({
    url: '/box/boxitemdel',
    method: 'post',
    data
  })
}

export function boxlottery() {
  return request({
    url: '/box/boxlottery',
    method: 'get'
  })
}

export function boxlotteryadd(data) {
  return request({
    url: '/box/boxlottery',
    method: 'post',
    data
  })
}

export function boxlotterymod(data) {
  return request({
    url: '/box/boxlotterymod/' + data.get('id'),
    method: 'post',
    data
  })
}

export function boxlotterydel(data) {
  return request({
    url: '/box/boxlotterydel/' + data,
    method: 'get'
  })
}

export function boxglobal() {
  return request({
    url: '/box/boxglobal',
    method: 'get'
  })
}

export function boxglobaladd(data) {
  return request({
    url: '/box/boxglobal',
    method: 'post',
    data
  })
}

export function boxglobalmod(data) {
  return request({
    url: '/box/boxglobalmod/' + data.get('id'),
    method: 'post',
    data
  })
}
