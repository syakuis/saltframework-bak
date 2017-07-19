import { combineReducers } from 'redux';

import view from './view';
import demo from './demo';

const reducers = combineReducers({ view, demo });

export default reducers;
