import {
  listModules,
  addModules,
  editModules,
  listPermission,
  addPermission,
  editPermission,
  permissionInfo,
  deletePermission,
  dictListPermission,
  dictModules,
  modulesInfo,
  permissionMouduleList,
  delModules,
  getBillProjectTrend,
  tableManageList,
  tableManageAdd,
  tableManageEdit,
  tableManageDel
} from '@/api/admin'

const state = {
  listmodules: [],
  dict_modules: [],
  listpermission: [],
  permissioninfo: [],
  dictlistpermission: {},
  per_page: 0,
  total_pages: 0,
  modules_total_items: 0,
  permission_total_items: 0
}

const mutations = {
  SET_LIST_MODULES: (state, data) => {
    state.listmodules = data
  },
  DICT_MODULES: (state, data) => {
    state.dict_modules = data
  },
  SET_LIST_PERMISSION: (state, data) => {
    state.listpermission = data
  },
  SET_INFO_PERMISSION: (state, data) => {
    state.permissioninfo = data
  },
  SET_DICT_LIST_PERMISSION: (state, data) => {
    state.dictlistpermission = data
  },
  SET_PER_PAGE: (state, data) => {
    state.per_page = data
  },
  SET_TOTAL_PAGES: (state, data) => {
    state.total_pages = data
  },
  MOUDLE_TOTAL_ITEMS: (state, data) => {
    state.modules_total_items = data
  },
  PERMISSION_TOTAL_ITEMS: (state, data) => {
    state.permission_total_items = data
  }
}

const actions = {
  listModules({ commit }, data) {
    // console.log(data)
    return new Promise((resolve, reject) => {
      listModules(data).then(res => {
        // console.log(res)
        commit('SET_LIST_MODULES', res.data.items)
        commit('MOUDLE_TOTAL_ITEMS', res.data._meta.total_items)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  dictModules({ commit }) {
    return new Promise((resolve, reject) => {
      dictModules().then(res => {
        // console.log(res)
        commit('DICT_MODULES', res.data)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  permissionMouduleList({ commit }) {
    return new Promise((resolve, reject) => {
      permissionMouduleList().then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  addModules({ commit }, data) {
    return new Promise((resolve, reject) => {
      addModules(data).then(res => {
        // console.log(res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  editModules({ commit }, data) {
    return new Promise((resolve, reject) => {
      editModules(data).then(res => {
        // console.log(res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  modulesInfo({ commit }, data) {
    return new Promise((resolve, reject) => {
      modulesInfo(data).then(res => {
        // console.log(res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  listPermission({ commit }, data) {
    return new Promise((resolve, reject) => {
      listPermission(data).then(res => {
        // console.log(res)
        commit('SET_LIST_PERMISSION', res.data.items)
        commit('SET_PER_PAGE', res.data._meta.per_page)
        commit('SET_TOTAL_PAGES', res.data._meta.total_pages)
        commit('PERMISSION_TOTAL_ITEMS', res.data._meta.total_items)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  addPermission({ commit }, data) {
    return new Promise((resolve, reject) => {
      addPermission(data).then(res => {
        // console.log(res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  editPermission({ commit }, data) {
    return new Promise((resolve, reject) => {
      editPermission(data).then(res => {
        // console.log(res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  permissionInfo({ commit }, data) {
    return new Promise((resolve, reject) => {
      permissionInfo(data).then(res => {
        // console.log(res)
        commit('SET_INFO_PERMISSION', res.data)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  deletePermission({ commit }, data) {
    return new Promise((resolve, reject) => {
      deletePermission(data).then(res => {
        // console.log(res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  dictListPermission({ commit }) {
    return new Promise((resolve, reject) => {
      dictListPermission().then(res => {
        // console.log(res)
        commit('SET_DICT_LIST_PERMISSION', res.data)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  delModules({ commit }, data) {
    return new Promise((resolve, reject) => {
      delModules(data).then(res => {
        // console.log(res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getBillProjectTrend({ commit }, data) {
    return new Promise((resolve, reject) => {
      getBillProjectTrend(data).then(res => {
        // console.log(res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  tableManageList({ commit }) {
    return new Promise((resolve, reject) => {
      tableManageList().then(res => {
        // console.log(res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  tableManageAdd({ commit }, data) {
    return new Promise((resolve, reject) => {
      tableManageAdd(data).then(res => {
        // console.log(res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  tableManageEdit({ commit }, data) {
    return new Promise((resolve, reject) => {
      tableManageEdit(data).then(res => {
        // console.log(res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  tableManageDel({ commit }, data) {
    return new Promise((resolve, reject) => {
      tableManageDel(data).then(res => {
        // console.log(res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
