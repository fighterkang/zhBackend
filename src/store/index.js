import vue from 'vue'
import vuex from 'vuex'
import basic from './modules/basic'
import toast from './modules/toast'
import contextmenu from './modules/contextmenu'
import loading from './modules/loading'
import player from './modules/player'
import modelbox from './modules/modelbox'
import editer from './modules/editer'
import slidemodel from './modules/slidemodel'
import Cookie from 'store'
// console.log(Cookie.get('topBarActiveItem'))
vue.use(vuex)
const store = new vuex.Store({
  state: {
    editerReloadData: false,
    imagepreview: {
      show: false,
      image: null,
    },
    showUpload: false,
    topBarActiveItem: Cookie.get('topBarActiveItem') || null,     // 从cookie中注入
  },
  actions: {
    editerReload({commit}) {
      commit('EDITRELOAD')
    },
    PreviewImage({ commit, dispatch }, data) {
      commit('PREVIEWIMAGE', data)
    },
    ToggleUpload({ commit, dispatch }, data) {
      commit('TOGGLEUPLOAD', data)
    },
    ToggleTopBarActive({ commit, dispatch }, data) {
      commit('TOGGLETOPBARACTIVE', data)
    },
  },
  mutations: {
    EDITRELOAD(state) {
      state.editerReloadData = !state.editerReloadData
    },
    PREVIEWIMAGE(state, data) {
      Object.assign(state.imagepreview, data)
    },
    TOGGLEUPLOAD(state, data){
      state.showUpload = data
    },
    TOGGLETOPBARACTIVE(state, data){
      Cookie.set('topBarActiveItem', data)
      state.topBarActiveItem = data
    },
  },
  getters: {},
  modules: {
    basic,
    toast,
    modelbox,
    editer,
    loading,
    contextmenu,
    slidemodel,
    player,
  },
})
if (module.hot) {
  module.hot.accept(
    [
      './modules/basic',
      './modules/toast',
      './modules/modelbox',
      './modules/editer',
      './modules/loading',
      './modules/contextmenu',
      './modules/slidemodel',
      './modules/player'
    ],
    () => store.hotUpdate({
      modules: {
        basic: require('./modules/basic').default,
        toast: require('./modules/toast').default,
        modelbox: require('./modules/modelbox').default,
        editer: require('./modules/editer').default,
        loading: require('./modules/loading').default,
        contextmenu: require('./modules/contextmenu').default,
        slidemodel: require('./modules/slidemodel').default,
        player: require('./modules/player').default,
      },
    }))
}
export default store
