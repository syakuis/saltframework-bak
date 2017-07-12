import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { Link } from 'react-router-dom';

import reducers from '_reducers';
import Layout from '_layouts/cdc';

const store = createStore(reducers);
const Dashboard2 = () => (
  <Provider store={store}>
    <Layout>
      <div>
        <Link to="/">1111</Link>
        <Link to="/2">2222</Link>
        dashboard222
      </div>
    </Layout>
  </Provider>
);

export default Dashboard2;
