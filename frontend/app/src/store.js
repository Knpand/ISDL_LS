import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

/**
 * 状態を保持したい変数の管理
 */
const state = {
  count: 0,
  userID:"",
  userToken:"",
  username:"ゲスト"
}
/**
 * actionsはmutationsを利用して，アクションの処理を実装
 */
const actions = {
  increment (context) {
    context.commit('increment')
  },
  decrement ({ commit }) {
    commit('decrement')
  },

  auth(context,user){
      context.commit('updateUser',user)
  },
  loginusername(context,name){
    context.commit('loginuser',name)
  },

}
/**
 * gettersはstateの値を取得するのに利用
 */
const getters = {
  getCount (state) {
    return state.count
  }
}
/**
 * mutationsは値の移り変わりの処理を実装
 */
const mutations = {
  increment (state) {
    state.count += 1
  },
  decrement (state) {
    state.count -= 1
  },

  updateUser (state,user){
      state.userID=user.userID
      state.userToken=user.userToken
      state.username=user.username
  },
  logout(state){
      state.userID=""
      state.username=""
  },
  loginuser(state,name){
    state.username=name
  }
}

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
})
