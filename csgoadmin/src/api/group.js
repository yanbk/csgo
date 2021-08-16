import request from '@/utils/request'

export function groupsList() {
  return request({
    url: '/user/groups_list',
    method: 'get'
  })
}

export function groupsInfo(data) {
  return request({
    url: '/user/groups_info/' + data.id,
    method: 'get'
  })
}

export function groupsAdd(data) {
  return request({
    url: '/user/groups_add',
    method: 'post',
    data
  })
}

export function groupsDel(data) {
  return request({
    url: '/user/groups_del/' + data.id,
    method: 'get'
  })
}

export function groupsEdit(data) {
  return request({
    url: '/user/groups_edit/' + data.id,
    method: 'post',
    data
  })
}
