import { combineReducers } from 'redux';

import view from './view';
import repo from './repository';

const reducers = combineReducers({ view, repo });

export default reducers;
