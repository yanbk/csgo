import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/user/own_info',
    method: 'get'
  })
}

export function userList(data) {
  return request({
    url: '/user/user_list',
    method: 'get',
    params: data
  })
}

export function addUser(data) {
  return request({
    url: '/user/add_user',
    method: 'post',
    data: data
  })
}

export function editUser(data) {
  return request({
    url: '/user/edit_user/' + data.id,
    method: 'post',
    data: data
  })
}

export function userInfo(data) {
  return request({
    url: '/user/user_info/' + data.id,
    method: 'get'
  })
}

export function delUser(data) {
  return request({
    url: '/user/del_user/' + data.id,
    method: 'get'
  })
}

export function updateOwnUser(data) {
  return request({
    url: '/user/update_own_user/' + data.id,
    method: 'post',
    data
  })
}

export function ldapSettingInfo() {
  return request({
    url: 'user/ldap_setting_info',
    method: 'get'
  })
}

export function ldapSettingEdit(data) {
  return request({
    url: '/user/ldap_setting_edit',
    method: 'post',
    data
  })
}

export function ldapTestConn(data) {
  return request({
    url: '/user/ldap_test_conn',
    method: 'post',
    data
  })
}

export function ldapsTestConn(data) {
  return request({
    url: '/user/ldaps_test_conn',
    method: 'post',
    data
  })
}

export function ldapTestLogin(data) {
  return request({
    url: '/user/ldap_test_login',
    method: 'post',
    data
  })
}

export function ldapImportUser() {
  return request({
    url: '/user/ldap_import_user',
    method: 'get'
  })
}

export function ldapOrganization() {
  return request({
    url: '/user/ldap_organization',
    method: 'get'
  })
}

export function ldapUserEditStatusToActiv(data) {
  return request({
    url: '/user/ldap_user_edit_status_to_activ',
    method: 'post',
    data
  })
}

export function ldapUserEditStatusToDie(data) {
  return request({
    url: '/user/ldap_user_edit_status_to_die',
    method: 'post',
    data
  })
}

export function ldapSafeGroupUser(data) {
  return request({
    url: '/user/ldap_safe_group_user',
    method: 'post',
    data
  })
}

export function ldapAddUserToSafeGroup(data) {
  return request({
    url: '/user/ldap_add_user_to_safe_group',
    method: 'post',
    data
  })
}

export function ldapRemoveUserToSafeGroup(data) {
  return request({
    url: '/user/ldap_remove_user_to_safe_group',
    method: 'post',
    data
  })
}

export function ldapGroupAdd(data) {
  return request({
    url: '/user/ldap_group_add',
    method: 'post',
    data
  })
}

export function ldapUserAdd(data) {
  return request({
    url: '/user/ldap_user_add',
    method: 'post',
    data
  })
}

export function ldapUserInfo(data) {
  return request({
    url: '/user/ldap_user_info',
    method: 'post',
    data
  })
}

export function ldapUserEditInfo(data) {
  return request({
    url: '/user/ldap_user_edit_info',
    method: 'post',
    data
  })
}

export function ldapGroup() {
  return request({
    url: '/user/ldap_group',
    method: 'get'
  })
}

export function ldapChangeUserGroup(data) {
  return request({
    url: '/user/ldap_change_user_group',
    method: 'post',
    data
  })
}

export function ldapUserInfoUrl(data) {
  return request({
    url: '/user/ldap_user_info_url',
    method: 'post',
    data
  })
}

export function ldapUserInfoPwd(data) {
  return request({
    url: '/user/ldap_user_edit_pwd',
    method: 'post',
    data
  })
}

export function permissionMouduleList() {
  return request({
    url: '/user/permission_moudule_list',
    method: 'get'
  })
}
