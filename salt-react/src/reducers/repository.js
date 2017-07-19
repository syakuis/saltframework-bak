import * as actions from '_actions/repository';
import update from 'react-addons-update';
import { Map, List } from 'immutable';

const objectAssign = (data, data2) => (Object.assign({}, data, data2));

const arrayPush = (state, id, key, value) => {
  const data = Map(state[id]);
  const item = data.get(key);
  const list = List(item).push(value);
  const result = data.merge({ [key]: list }).toJS();
  return objectAssign(state, { [id]: result });
};

const arraySplice = (state, id, key, index) => {
  const data = Map(state[id]);
  const item = data.get(key);
  item.splice(index, 1);

  const result = data.merge({ [key]: item }).toJS();
  return objectAssign(state, { [id]: result });
};

const repository = (state = {}, action) => {
  const { id, key, value } = action;

  if (id === undefined || id === null || id === '') {
    // throw new Error('should not be null, id');
    return state;
  }

  switch (action.type) {
    case actions.CREATE_REPO:
      return Object.assign({}, state, { [id]: value });
    case actions.SET_REPO: {
      return Object.assign({}, state, {
        [id]: update(state[id], { $merge: { [key]: value } }),
      });
    }
    case actions.ARRAY_PUSH_REPO:
      return arrayPush(state, id, key, value);
    case actions.ARRAY_SPLICE_REPO:
      return arraySplice(state, id, key, value);
    case actions.DEL_REPO: {
      const repo = {
        [id]: Object.assign({}, state[id]),
      };

      delete repo[id][key];

      return Object.assign({}, state, { [id]: repo });
    }
    default:
      return state;
  }
};

export default repository;
