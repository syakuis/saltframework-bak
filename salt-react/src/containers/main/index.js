import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, browserHistory } from 'react-router-dom';
import shortid from 'shortid';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

import '_resources/css/common.css';
import '_resources/css/non-responsive.css';

import { RouteWithSubRoutes } from '_components/router';

const propTypes = {
  routes: PropTypes.array,
};

const defaultProps = {
  routes: [
    {
      path: '/',
      component: 'dashboard',
      strict: true,
      exact: true,
    },
    {
      path: '/2',
      component: 'dashboard2',
      strict: false,
      exact: false,
    },
  ],
};

const MainContainer = props => (
  <Router history={browserHistory}>
    <div>
      {props.routes.map(route => (
        <RouteWithSubRoutes key={shortid.generate()} {...route} />
      ))}
    </div>
  </Router>
);

MainContainer.defaultProps = defaultProps;
MainContainer.propTypes = propTypes;

export default MainContainer;
