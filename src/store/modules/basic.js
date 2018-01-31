const namespaced = true

const state = {
  basic: {
    projects: [],
    role: null,
    username: null,
    activeProject: null,
  }
}

const mutations = {
  SETLOGINDATA(state, data) {
    Object.assign(state.basic, data)
  },
  UPDATEIMAGEHEAD(state, data) {
    state.basic.img = data
  },
}

const actions = {
  setLoginData({ commit }, data) {
    commit('SETLOGINDATA', data)
  },
  updateImageHead({ commit }, data) {
    commit('UPDATEIMAGEHEAD', data)
  },
}

export default { namespaced, state, mutations, actions }
