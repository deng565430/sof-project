import * as types from './mutations-types';

/* export const getMsg = (state, payload) => {
  state.msg = payload.msg;
};
export const setBrieid = (state, brieid) => {
  state.brieid = brieid;
}; */

const mutations = {
  [types.USER_NAME](state, username) {
    state.userName = username
  },
  [types.DIOLOG_VISIBLE](state, flag) {
    state.dialogVisible = flag
  },
  [types.IS_LOGIN](state, flag) {
    state.isLogin = flag
  },
  [types.MENU](state, menu) {
    state.menu = menu
  },
  [types.JURISDICTION](state, data) {
    state.jurisdiction = data
  }
};

export default mutations
