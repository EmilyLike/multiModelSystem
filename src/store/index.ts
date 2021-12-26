import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: JSON.parse(sessionStorage.getItem('useInfo') || '{}'),
    menuName: '数据采集',
  },
  getters: {
    userInfo: (state) => state.userInfo,
    menuName: (state) => state.menuName,
  },
  mutations: {
    changeUserInfo(state, payload) {
      console.log('this is userInfo', payload);
      state.userInfo = payload;
    },
    changemenuName(state, payload) {
      console.log('this is menuName', payload);
      state.menuName = payload;
    },
  },
  actions: {
    EDIT_USER_INFO({ commit }, payload) {
      return new Promise((res, rej) => {
        commit('changeUserInfo', payload || {});
        sessionStorage.setItem('userInfo', JSON.stringify(payload));
        res(12233);
      });
    },
  },
  modules: {},
});
