const namespaced = true

const state = {
  status: false,
  text: '正在上传...',
}

const mutations = {
  UPDATE(state, data) {
    Object.assign(state, data)
  },
}

const actions = {
  update({ commit }, { status = true, text = '' }) {
    commit('UPDATE', { status, text})
  },
}

export default { namespaced, state, mutations, actions }
