import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import view from '_reducers/view';

import { Link } from 'react-router-dom';

import Layout from '_layouts/cdc';

const propTypes = {
  common: PropTypes.object.isRequired,
};

const Dashboard = (props) => {
  const reducers = combineReducers({ view });
  const store = createStore(reducers, { view: props.common });

  return (
    <Provider store={store}>
      <Layout>
        <div>
          <Link to="/">11sadas11</Link>
          <Link to="/2">2222</Link>
          dashboard
        </div>
      </Layout>
    </Provider>
  );
};

Dashboard.propTypes = propTypes;

export default Dashboard;
