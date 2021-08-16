import { groupsList, groupsInfo, groupsAdd, groupsDel, groupsEdit } from '@/api/group'

const state = {
  groupslist: [],
  groupsinfo: {}
}

const mutations = {
  SET_GROUPSLIST: (state, data) => {
    state.groupslist = data
  },
  SET_GROUPSINFO: (state, data) => {
    state.groupsinfo = data
  }
}

const actions = {
  groupsList({ commit }) {
    return new Promise((resolve, reject) => {
      groupsList().then(res => {
        // console.log(res)
        commit('SET_GROUPSLIST', res.data)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  groupsInfo({ commit }, data) {
    return new Promise((resolve, reject) => {
      groupsInfo(data).then(res => {
        // console.log(res)
        commit('SET_GROUPSINFO', res.data)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  groupsAdd({ commit }, data) {
    return new Promise((resolve, reject) => {
      groupsAdd(data).then(res => {
        // console.log(res)
        // commit('SET_GROUPSINFO', res.data)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  groupsDel({ commit }, data) {
    return new Promise((resolve, reject) => {
      groupsDel(data).then(res => {
        // console.log(res)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  groupsEdit({ commit }, data) {
    return new Promise((resolve, reject) => {
      groupsEdit(data).then(res => {
        // console.log(res)
        resolve(res)
      }).catch(error => {
        reject(error)
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
