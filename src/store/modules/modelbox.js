const namespaced = true

const state = {
  status: null,
  params: null,
  config: null,
}

const mutations = {
  SHOW(state, data) {
    if (typeof data === 'object') {
      Object.assign(state,data)
    } else {
      state.status = data
    }
  },
  CLOSE(state) {
    Object.assign(state,{status:null,params:null,config:null}) 
  },
}

const actions = {
  show({ commit }, data) {
    commit('SHOW', data)
  },
  close({ commit }) {
    commit('CLOSE')
  },
}

export default { namespaced, state, mutations, actions }
