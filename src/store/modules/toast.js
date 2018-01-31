const namespaced = true

const state = {
  type: null,
  content: null,
  time: null,
  status: false,
}

const mutations = {
  UPDATE(state, data) {
    Object.assign(state, data)
  },
}

const actions = {
  update({ commit }, { type = 'info', content = '', time = 1000, status = !state.status }) {
    commit('UPDATE', { type, content, time, status })
  },
}

export default { namespaced, state, mutations, actions }
