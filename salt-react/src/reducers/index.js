import { combineReducers } from 'redux';

import view from './view';
import repo from './repository';
import demo from './demo';

const reducers = combineReducers({ view, repo, demo });

export default reducers;
