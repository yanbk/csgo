import request from '@/utils/request'

export function rollconfig(data) {
  return request({
    url: '/roll/rollconfig',
    method: 'get',
    params: data
  })
}

export function rollconfigadd(data) {
  return request({
    url: '/roll/rollconfig',
    method: 'post',
    data
  })
}

export function rollconfigmod(data) {
  return request({
    url: '/roll/rollconfigmod/' + data.id,
    method: 'post',
    data
  })
}

export function rollconfigdel(data) {
  return request({
    url: '/roll/rollconfigdel/' + data,
    method: 'get'
  })
}

export function rollitemlist(data) {
  return request({
    url: '/roll/rollitemlist/' + data,
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

export function rollitemset(data) {
  return request({
    url: '/roll/rollitemset',
    method: 'post',
    data
  })
}

export function rollitemdel(data) {
  return request({
    url: '/roll/rollitemdel',
    method: 'post',
    data
  })
}

export function rebate() {
  return request({
    url: '/roll/rebate',
    method: 'get'
  })
}

export function rebateadd(data) {
  return request({
    url: '/roll/rebate',
    method: 'post',
    data
  })
}

export function rebatemod(data) {
  return request({
    url: '/roll/rebatemod/' + data.get('id'),
    method: 'post',
    data
  })
}

export function rebatedel(data) {
  return request({
    url: '/roll/rebatedel/' + data,
    method: 'get'
  })
}
