import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import Cookie from 'js-cookie';

const propTypes = {
  component: PropTypes.func,
  location: PropTypes.string,
};

const defaultProps = {
  component: null,
  location: null,
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuth = Cookie.get('isAuthentication');
  return (
    <Route
      {...rest}
      render={props => (
      isAuth ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
    )
    )}
    />
  );
};

PrivateRoute.propTypes = propTypes;
PrivateRoute.defaultProps = defaultProps;

export default PrivateRoute;
