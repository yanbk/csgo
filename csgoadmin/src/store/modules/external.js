import {
  externalAuthList,
  externalAuthAdd,
  externalAuthEdit,
  externalAuthInfo,
  externalAuthDel,
  externalAuthDevList,
  externalAuthGroupsList,
  externalAuthGroupsAdd,
  externalAuthGroupsEdit,
  externalAuthGroupsInfo,
  externalAuthGroupsDel,
  externalAuthUserList,
  externalAuthPermissionList,
  externalAuthPermissionAdd,
  externalAuthPermissionDel,
  externalAuthPermissionInfo,
  externalAuthPermissionEdit
} from '@/api/external'

const state = {
}

const mutations = {
}

const actions = {
  externalAuthList({ commit }, log) {
    return new Promise((resolve, reject) => {
      externalAuthList().then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  externalAuthAdd({ commit }, data) {
    return new Promise((resolve, reject) => {
      externalAuthAdd(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  externalAuthEdit({ commit }, data) {
    return new Promise((resolve, reject) => {
      externalAuthEdit(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  externalAuthInfo({ commit }, data) {
    return new Promise((resolve, reject) => {
      externalAuthInfo(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  externalAuthDel({ commit }, data) {
    return new Promise((resolve, reject) => {
      externalAuthDel(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  externalAuthDevList({ commit }, data) {
    return new Promise((resolve, reject) => {
      externalAuthDevList(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  externalAuthGroupsList({ commit }, data) {
    return new Promise((resolve, reject) => {
      externalAuthGroupsList(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  externalAuthGroupsAdd({ commit }, data) {
    return new Promise((resolve, reject) => {
      externalAuthGroupsAdd(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  externalAuthGroupsInfo({ commit }, data) {
    return new Promise((resolve, reject) => {
      externalAuthGroupsInfo(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  externalAuthGroupsEdit({ commit }, data) {
    return new Promise((resolve, reject) => {
      externalAuthGroupsEdit(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  externalAuthGroupsDel({ commit }, data) {
    return new Promise((resolve, reject) => {
      externalAuthGroupsDel(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  externalAuthUserList({ commit }, data) {
    return new Promise((resolve, reject) => {
      externalAuthUserList(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  externalAuthPermissionList({ commit }, data) {
    return new Promise((resolve, reject) => {
      externalAuthPermissionList(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  externalAuthPermissionAdd({ commit }, data) {
    return new Promise((resolve, reject) => {
      externalAuthPermissionAdd(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  externalAuthPermissionDel({ commit }, data) {
    return new Promise((resolve, reject) => {
      externalAuthPermissionDel(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  externalAuthPermissionInfo({ commit }, data) {
    return new Promise((resolve, reject) => {
      externalAuthPermissionInfo(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  externalAuthPermissionEdit({ commit }, data) {
    return new Promise((resolve, reject) => {
      externalAuthPermissionEdit(data).then(res => {
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
