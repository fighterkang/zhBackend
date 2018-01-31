const namespaced = true

const state = {
  status: false,
  url: null,
}

const mutations = {
  UPDATE(state, data) {
    Object.assign(state, data)
  },
}

const actions = {
  update({ commit }, { status = true, url = '' }) {
    commit('UPDATE', { status, url})
  },
}

export default { namespaced, state, mutations, actions }
