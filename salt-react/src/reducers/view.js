import * as actions from '_actions/ViewAction';

const defaultState = {
  layoutHidden: false,
  browserTitle: '',
};

const view = (state = defaultState, action) => {
  switch (action.type) {
    case actions.SET_VIEW_INITIALIZE:
      return actions.setInitDashboard();
    default:
      return state;
  }
};

export default view;

