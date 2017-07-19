import PropTypes from 'prop-types';

export const CREATE_REPO = 'CREATE_REPO';
export const SET_REPO = 'SET_REPO';
export const DEL_REPO = 'DEL_REPO';
export const ARRAY_PUSH_REPO = 'ARRAY_PUSH_REPO';
export const ARRAY_SPLICE_REPO = 'ARRAY_SPLICE_REPO';

export const createRepo = (id, value) => ({ type: CREATE_REPO, id, value });
export const setRepo = (id, key, value) => ({ type: SET_REPO, id, key, value });
export const delRepo = (id, key) => ({ type: DEL_REPO, id, key });

export const arrayPushRepo = (id, key, value) => ({ type: ARRAY_PUSH_REPO, id, key, value });
export const arraySpliceRepo = (id, key, value) => ({ type: ARRAY_SPLICE_REPO, id, key, value });

export const repoDispatchToProps = dispatch => ({
  createRepo: (id, value) => dispatch(createRepo(id, value)),
  setRepo: (id, key, value) => dispatch(setRepo(id, key, value)),
  delRepo: (id, key) => dispatch(delRepo(id, key)),

  arrayPushRepo: (id, key, value) => dispatch(arrayPushRepo(id, key, value)),
  arraySpliceRepo: (id, key, value) => dispatch(arraySpliceRepo(id, key, value)),
});

export const repoPropTypes = {
  createRepo: PropTypes.func,
  setRepo: PropTypes.func,
  delRepo: PropTypes.func,
  arrayPushRepo: PropTypes.func,
  arraySpliceRepo: PropTypes.func,
};

export const repoStateToProps = state => (state.repo);
