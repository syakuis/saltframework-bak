import * as actions from '_actions/demo';

const defaultState = {
  count: 0,
};

const demo = (state = defaultState, action) => {
  switch (action.type) {
    case actions.SET_DEMO_COUNT:
      return Object.assign({ count: state.count + 1 });
    default:
      return state;
  }
};

export default demo;

