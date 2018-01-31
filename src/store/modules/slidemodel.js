const namespaced = true

const state = {
  status: null,
  params: null,
  multiple: null,
  config: null,
  type: null
}

const mutations = {
  SHOW(state, data) {
    if (typeof data === 'object') {
      Object.assign(state, data)
    } else {
      state.status = data
    }
  },
  CLOSE(state) {
    Object.assign(state, {
      status: null,
      params: null,
      multiple: null,
      config: null,
      type: null
    })
  }
}

const actions = {
  show({
    commit
  }, data) {
    data.type = data.type || 'slide-right'
    commit('SHOW', data)
  },
  close({commit}) {
    commit('CLOSE')
  }
}

export default {
  namespaced,
  state,
  mutations,
  actions
}
