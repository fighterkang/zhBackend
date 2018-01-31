const namespaced = true

const state = {
  tableList:null
}

const mutations = {
  SETTABLELIST(state, data) {
    state.tableList = Object.assign({}, data)
  },
}

const actions = {
  setTableList({commit}, data) {
    commit('SETTABLELIST', data)
  }
}

export default { namespaced, state, mutations, actions }
