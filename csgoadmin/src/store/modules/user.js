import { login,
  getInfo,
  userList,
  addUser,
  editUser,
  userInfo,
  delUser,
  updateOwnUser,
  ldapSettingInfo,
  ldapSettingEdit,
  ldapTestConn,
  ldapsTestConn,
  ldapTestLogin,
  ldapImportUser,
  ldapOrganization,
  ldapUserEditStatusToActiv,
  ldapUserEditStatusToDie,
  ldapSafeGroupUser,
  ldapAddUserToSafeGroup,
  ldapRemoveUserToSafeGroup,
  ldapGroupAdd,
  ldapUserAdd,
  ldapUserInfo,
  ldapUserEditInfo,
  ldapGroup,
  ldapChangeUserGroup,
  ldapUserInfoUrl,
  ldapUserInfoPwd
} from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  roles: [],
  userinfo: '',
  userlist: [],
  total_pages: 0,
  per_page: 0,
  total_items: 0,
  groups: [],
  organization: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  PER_PAGE: (state, data) => {
    state.per_page = data
  },
  TOTAL_PAGES: (state, data) => {
    state.total_pages = data
  },
  TOTAL_ITEMS: (state, data) => {
    state.total_items = data
  },
  SET_USERINFO: (state, data) => {
    state.userinfo = data
  },
  GET_USERLIST: (state, data) => {
    state.userlist = data
  },
  SET_GROUPS: (state, data) => {
    state.groups = data
  },
  SET_ORGANIZATION: (state, data) => {
    state.organization = data
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    // console.log(userInfo)
    return new Promise((resolve, reject) => {
      // console.log(userInfo)
      login({ username: username.trim(), password: password }).then(response => {
        // console.log(response)
        commit('SET_TOKEN', response.data.token)
        setToken(response.data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        // console.log(response)
        var roles = response.data.permissions
        var data = { ...response.data, roles: roles }
        // console.log(data)
        commit('SET_ROLES', roles)
        commit('SET_USERINFO', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  updateOwnUser({ commit }, data) {
    return new Promise((resolve, reject) => {
      updateOwnUser(data).then(response => {
        // console.log(response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  userList({ commit }, data) {
    return new Promise((resolve, reject) => {
      userList(data).then(response => {
        // console.log(response)
        commit('GET_USERLIST', response.data.items)
        commit('PER_PAGE', response.data._meta.per_page)
        commit('TOTAL_PAGES', response.data._meta.total_pages)
        commit('TOTAL_ITEMS', response.data._meta.total_items)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  userAllList({ commit }, data) {
    return new Promise((resolve, reject) => {
      userList({ page: 0 }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  addUser({ commit }, data) {
    return new Promise((resolve, reject) => {
      addUser(data).then(response => {
        // console.log(response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  editUser({ commit }, data) {
    return new Promise((resolve, reject) => {
      editUser(data).then(response => {
        // console.log(response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  delUser({ commit }, data) {
    return new Promise((resolve, reject) => {
      delUser(data).then(response => {
        // console.log(response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  userInfo({ commit }, data) {
    return new Promise((resolve, reject) => {
      userInfo(data).then(response => {
        // console.log(response)
        commit('SET_GROUPS', response.data.group)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  ldapSettingInfo({ commit }) {
    return new Promise((resolve, reject) => {
      ldapSettingInfo().then(response => {
        // console.log(response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ldapSettingEdit({ commit }, data) {
    return new Promise((resolve, reject) => {
      ldapSettingEdit(data).then(response => {
        // console.log(response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ldapTestConn({ commit }, data) {
    return new Promise((resolve, reject) => {
      ldapTestConn(data).then(response => {
        // console.log(response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ldapsTestConn({ commit }, data) {
    return new Promise((resolve, reject) => {
      ldapsTestConn(data).then(response => {
        // console.log(response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ldapTestLogin({ commit }, data) {
    return new Promise((resolve, reject) => {
      ldapTestLogin(data).then(response => {
        // console.log(response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ldapImportUser({ commit }, data) {
    return new Promise((resolve, reject) => {
      ldapImportUser(data).then(response => {
        // console.log(response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ldapOrganization({ commit }) {
    return new Promise((resolve, reject) => {
      ldapOrganization().then(response => {
        // console.log(response)
        commit('SET_ORGANIZATION', response.data)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ldapUserEditStatusToActiv({ commit }, data) {
    return new Promise((resolve, reject) => {
      ldapUserEditStatusToActiv(data).then(response => {
        // console.log(response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ldapUserEditStatusToDie({ commit }, data) {
    return new Promise((resolve, reject) => {
      ldapUserEditStatusToDie(data).then(response => {
        // console.log(response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ldapSafeGroupUser({ commit }, data) {
    return new Promise((resolve, reject) => {
      ldapSafeGroupUser(data).then(response => {
        // console.log(response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ldapAddUserToSafeGroup({ commit }, data) {
    return new Promise((resolve, reject) => {
      ldapAddUserToSafeGroup(data).then(response => {
        // console.log(response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ldapRemoveUserToSafeGroup({ commit }, data) {
    return new Promise((resolve, reject) => {
      ldapRemoveUserToSafeGroup(data).then(response => {
        // console.log(response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ldapGroupAdd({ commit }, data) {
    return new Promise((resolve, reject) => {
      ldapGroupAdd(data).then(response => {
        // console.log(response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ldapUserAdd({ commit }, data) {
    return new Promise((resolve, reject) => {
      ldapUserAdd(data).then(response => {
        // console.log(response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ldapUserInfo({ commit }, data) {
    return new Promise((resolve, reject) => {
      ldapUserInfo(data).then(response => {
        // console.log(response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ldapUserEditInfo({ commit }, data) {
    return new Promise((resolve, reject) => {
      ldapUserEditInfo(data).then(response => {
        // console.log(response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ldapGroup({ commit }) {
    return new Promise((resolve, reject) => {
      ldapGroup().then(response => {
        // console.log(response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ldapChangeUserGroup({ commit }, data) {
    return new Promise((resolve, reject) => {
      ldapChangeUserGroup(data).then(response => {
        // console.log(response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ldapUserInfoUrl({ commit }, data) {
    return new Promise((resolve, reject) => {
      ldapUserInfoUrl(data).then(response => {
        // console.log(response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ldapUserInfoPwd({ commit }, data) {
    return new Promise((resolve, reject) => {
      ldapUserInfoPwd(data).then(response => {
        // console.log(response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, state, dispatch }) {
    commit('SET_TOKEN', '')
    commit('SET_ROLES', [])
    removeToken()
    resetRouter()
    dispatch('tagsView/delAllViews', null, { root: true })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
