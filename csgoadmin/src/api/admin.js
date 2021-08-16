import request from '@/utils/request'

export function listModules(data) {
  return request({
    url: '/user/list_modules',
    method: 'get',
    params: data
  })
}

export function dictModules() {
  return request({
    url: '/user/dict_modules',
    method: 'get'
  })
}

export function permissionMouduleList() {
  return request({
    url: '/user/permission_moudule_list',
    method: 'get'
  })
}

export function addModules(data) {
  return request({
    url: '/user/add_modules',
    method: 'post',
    data
  })
}

export function editModules(data) {
  return request({
    url: '/user/edit_modules/' + data.id,
    method: 'post',
    data
  })
}

export function modulesInfo(data) {
  return request({
    url: '/user/modules_info/' + data.id,
    method: 'get'
  })
}

export function listPermission(data) {
  return request({
    url: '/user/list_permission',
    method: 'get',
    params: data
  })
}

export function addPermission(data) {
  return request({
    url: '/user/add_permission',
    method: 'post',
    data
  })
}

export function editPermission(data) {
  return request({
    url: '/user/edit_permission/' + data.id,
    method: 'post',
    data
  })
}

export function permissionInfo(data) {
  return request({
    url: '/user/permission_info/' + data.id,
    method: 'get'
  })
}

export function deletePermission(data) {
  return request({
    url: '/user/del_permission/' + data.id,
    method: 'get'
  })
}

export function dictListPermission(data) {
  return request({
    url: '/user/dict_list_permission',
    method: 'get'
  })
}

export function delModules(data) {
  return request({
    url: '/user/del_modules/' + data.id,
    method: 'get'
  })
}

export function getBillProjectTrend(data) {
  return request({
    url: '/bill/get_bill_project_trend',
    method: 'post',
    data
  })
}

export function tableManageList() {
  return request({
    url: '/table_manage/table_manage_list',
    method: 'post'
  })
}

export function tableManageAdd(data) {
  return request({
    url: '/table_manage/table_manage_add',
    method: 'post',
    data
  })
}

export function tableManageEdit(data) {
  return request({
    url: '/table_manage/table_manage_edit/' + data.id,
    method: 'post',
    data
  })
}

export function tableManageDel(data) {
  return request({
    url: '/table_manage/table_manage_del/' + data.id,
    method: 'get'
  })
}
