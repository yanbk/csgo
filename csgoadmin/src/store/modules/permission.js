import { asyncRoutes, constantRoutes } from '@/router'
import Layout from '@/layout'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

export const loadView = (view) => { // 路由懒加载
  return (resolve) => require([`@/views/${view}`], resolve)
  // return () => import(`@/views/${view}`)
}

export function newRoute(routes) {
  routes.forEach(route => {
    if (route.children && route.children.length > 0) {
      route.path = '/' + route.url_path
      route.component = Layout
      route.meta = {
        title: route.show_name,
        icon: route.image,
        roles: ['admin']
      }
      // route.alwaysShow = true
      newRoute(route.children)
    } else {
      route.path = route.url_path
      route.component = (resolve) => require(['@/views/' + route.file_path], resolve)
      route.component = loadView(route.file_path)
      route.meta = {
        title: route.show_name,
        icon: route.image,
        roles: ['admin']
      }
      route.name = route.url_name
    }
  })
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  async generateRoutes({ dispatch, commit }, roles) {
    // console.log(roles)
    // var test = await dispatch('admin/tableManageList', null, { root: true })
    // newRoute(test.data)
    // console.log(test.data)
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      // accessedRoutes = [...accessedRoutes, ...test.data]
      commit('SET_ROUTES', accessedRoutes)
      // console.log(accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
