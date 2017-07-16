import * as actions from '_actions/config';

const defaultState = {
  layoutHidden: false, // 레이아웃 숨김 여부
  browserTitle: '', // 브라우저 제목
  isTabPanel: true,
  menus: {},
};

const config = (state = defaultState, action) => {
  switch (action.type) {
    case actions.SET_CONFIG_INITIALIZE:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};

export default config;

