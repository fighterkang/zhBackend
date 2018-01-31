const namespaced = true

const state = {
  status: false,
  position: [0, 0],
  items: [
    {
      text: 'item1',
      event: () => {
        alert('item1')
      },
    },
    {
      text: 'item1',
      event: () => {
        alert('item1')
      },
    }
  ],
  isMultiple: false,
}

const mutations = {
  UPDATE(state, data) {
    Object.assign(state, data)
  },
}

const actions = {
  update({ commit }, { status = false, position = [0, 0], items = [], isMultiple = false }) {
    commit('UPDATE', { status, position, items, isMultiple })
  },
}

export default { namespaced, state, mutations, actions }
