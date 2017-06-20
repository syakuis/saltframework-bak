import React from 'react';
import Cookie from 'js-cookie';

const propTypes = { };
const defaultProps = { };

class LogoutComponent extends React.Component {
  static logout(e) {
    e.preventDefault();
    Cookie.remove('isAuthentication');
    Cookie.remove('Authorization');
  }

  render() {
    return (
      <a href="" onClick={LogoutComponent.logout}>Logout</a>
    );
  }
}

LogoutComponent.propTypes = propTypes;
LogoutComponent.defaultProps = defaultProps;

export default LogoutComponent;
