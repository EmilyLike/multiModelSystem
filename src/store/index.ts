import { createStore } from 'vuex';

export default createStore({
  state: {
    userInfo: JSON.parse(sessionStorage.getItem('useInfo') || '{}'),
    menuName: '123',
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
        sessionStorage.setItem('useInfo', JSON.stringify(payload));
        res(12233);
      });
    },
  },
  modules: {},
});
