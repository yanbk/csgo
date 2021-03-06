const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  isEdit: state => state.user.roles.includes('visitor'),
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  groups: state => state.staff.groups,
  staffs: state => state.staff.staffs,
  userinfo: state => state.user.userinfo
}
export default getters
