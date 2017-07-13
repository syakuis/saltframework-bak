import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, browserHistory } from 'react-router-dom';
import shortid from 'shortid';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

import '_resources/css/common.css';
import '_resources/css/non-responsive.css';

import { RouteWithSubRoutes } from '_components/router';

const propTypes = {
  menus: PropTypes.array.isRequired,
};

const MainContainer = props => (
  <Router history={browserHistory}>
    <div>
      {props.menus.map((route) => {
        if (route.component !== undefined) {
          return <RouteWithSubRoutes key={shortid.generate()} {...route} />;
        }
        return '';
      })}
    </div>
  </Router>
);

MainContainer.propTypes = propTypes;

const store = state => ({
  menus: state.view.menus.MENU0000000000000003,
});

export default connect(store, undefined)(MainContainer);
