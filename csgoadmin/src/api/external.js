import request from '@/utils/request'

export function externalAuthList(data) {
  return request({
    url: 'external_auth/external_auth_list',
    method: 'get',
    data
  })
}

export function externalAuthAdd(data) {
  return request({
    url: 'external_auth/external_auth_add',
    method: 'post',
    data
  })
}

export function externalAuthEdit(data) {
  return request({
    url: 'external_auth/external_auth_edit/' + data.id,
    method: 'post',
    data
  })
}

export function externalAuthInfo(data) {
  return request({
    url: 'external_auth/external_auth_info/' + data.id,
    method: 'get'
  })
}

export function externalAuthDel(data) {
  return request({
    url: 'external_auth/external_auth_del/' + data.id,
    method: 'get'
  })
}

export function externalAuthDevList(data) {
  return request({
    url: 'external_auth/external_auth_dev_list',
    method: 'get',
    data
  })
}

export function externalAuthGroupsList(data) {
  return request({
    url: 'external_auth/external_auth_groups_list/' + data.external_auth_id,
    method: 'get'
  })
}

export function externalAuthGroupsAdd(data) {
  return request({
    url: 'external_auth/external_auth_groups_add',
    method: 'post',
    data
  })
}

export function externalAuthGroupsEdit(data) {
  return request({
    url: 'external_auth/external_auth_groups_edit/' + data.id,
    method: 'post',
    data
  })
}

export function externalAuthGroupsInfo(data) {
  return request({
    url: 'external_auth/external_auth_groups_info/' + data.id,
    method: 'get'
  })
}

export function externalAuthGroupsDel(data) {
  return request({
    url: 'external_auth/external_auth_groups_del/' + data.id,
    method: 'get'
  })
}

export function externalAuthUserList(data) {
  return request({
    url: 'external_auth/external_auth_user_list',
    method: 'get',
    params: data
  })
}

export function externalAuthPermissionList(data) {
  return request({
    url: 'external_auth/external_auth_permission_list/' + data.id,
    method: 'get'
  })
}

export function externalAuthPermissionAdd(data) {
  return request({
    url: 'external_auth/external_auth_permission_add/' + data.external_auth_id,
    method: 'post',
    data
  })
}

export function externalAuthPermissionDel(data) {
  return request({
    url: 'external_auth/external_auth_permission_del/' + data.external_auth_id,
    method: 'post',
    data
  })
}

export function externalAuthPermissionEdit(data) {
  return request({
    url: 'external_auth/external_auth_permission_edit/' + data.external_auth_id,
    method: 'post',
    data
  })
}

export function externalAuthPermissionInfo(data) {
  return request({
    url: 'external_auth/external_auth_permission_info/' + data.external_auth_id,
    method: 'post',
    data
  })
}

// 新的外部系统管理

export function newExternalAuthList(data) {
  return request({
    url: 'external_auth/external_auth_list',
    method: 'get',
    data
  })
}

export function newExternalAuthAdd(data) {
  return request({
    url: 'external_auth/external_auth_add',
    method: 'post',
    data
  })
}

export function newExternalAuthEdit(data) {
  return request({
    url: 'external_auth/external_auth_edit/' + data.id,
    method: 'post',
    data
  })
}

export function newExternalAuthInfo(data) {
  return request({
    url: 'external_auth/external_auth_info/' + data.id,
    method: 'get'
  })
}

export function newExternalAuthDel(data) {
  return request({
    url: 'external_auth/external_auth_del/' + data.id,
    method: 'get'
  })
}

export function newExternalAuthUserList(data) {
  return request({
    url: 'external_auth/external_auth_user_list',
    method: 'get',
    params: data
  })
}

export function newExternalAuthPermissionList(data) {
  return request({
    url: 'external_auth/external_auth_permission_list/' + data.id,
    method: 'get'
  })
}

export function newExternalAuthPermissionAdd(data, id) {
  return request({
    url: 'external_auth/external_auth_permission_add/' + id,
    method: 'post',
    data
  })
}

export function newExternalAuthPermissionDel(data) {
  return request({
    url: 'external_auth/external_auth_permission_del/' + data.external_auth_id,
    method: 'post',
    data
  })
}

export function newExternalAuthPermissionEdit(data) {
  return request({
    url: 'external_auth/external_auth_permission_edit/' + data.external_auth_id,
    method: 'post',
    data
  })
}

export function newExternalAuthPermissionInfo(data) {
  return request({
    url: 'external_auth/external_auth_permission_info/' + data.external_auth_id,
    method: 'post',
    data
  })
}

export function newExternalAuthGroupsList(data) {
  return request({
    url: 'external_auth/external_auth_groups_list/' + data.external_auth_id,
    method: 'get'
  })
}

export function newExternalAuthDevList(data) {
  return request({
    url: 'external_auth/external_auth_dev_list',
    method: 'get',
    data
  })
}

export function newExternalAuthGroupsAdd(data) {
  return request({
    url: 'external_auth/external_auth_groups_add',
    method: 'post',
    data
  })
}

export function newExternalAuthGroupsEdit(data) {
  return request({
    url: 'external_auth/external_auth_groups_edit/' + data.id,
    method: 'post',
    data
  })
}

export function newExternalAuthGroupsInfo(data) {
  return request({
    url: 'external_auth/external_auth_groups_info/' + data.id,
    method: 'get'
  })
}

export function newExternalAuthGroupsDel(data) {
  return request({
    url: 'external_auth/external_auth_groups_del/' + data.id,
    method: 'get'
  })
}

export function external_auth_param_list(data) {
  return request({
    url: 'external_auth/external_auth_param_list/' + data.external_auth_id,
    method: 'get'
  })
}

export function external_auth_param_add(data, id) {
  return request({
    url: 'external_auth/external_auth_param_add/' + id,
    method: 'post',
    data
  })
}

export function external_auth_param_edit(data, id) {
  return request({
    url: 'external_auth/external_auth_param_edit/' + id,
    method: 'post',
    data
  })
}

export function external_auth_param_del(data, id) {
  return request({
    url: 'external_auth/external_auth_param_del/' + id,
    method: 'post',
    data
  })
}

export function external_auth_param_class_list(data) {
  return request({
    url: 'external_auth/external_auth_param_class_list/' + data.external_auth_id,
    method: 'get'
  })
}

export function external_auth_param_class_add(data, id) {
  return request({
    url: 'external_auth/external_auth_param_class_add/' + id,
    method: 'post',
    data
  })
}

export function external_auth_param_class_edit(data, id) {
  return request({
    url: 'external_auth/external_auth_param_class_edit/' + id,
    method: 'post',
    data
  })
}

export function external_auth_param_class_del(data, id) {
  return request({
    url: 'external_auth/external_auth_param_class_del/' + id,
    method: 'post',
    data
  })
}
