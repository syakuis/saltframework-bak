import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Cookie from 'js-cookie';

const propTypes = {
  history: PropTypes.object,
};
const defaultProps = {
  history: null,
};

class LogoutComponent extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout(e) {
    e.preventDefault();
    Cookie.remove('isAuthentication');
    Cookie.remove('Authorization');
    this.props.history.push('/');
  }

  render() {
    return (
      <a href="" onClick={this.logout}>Logout</a>
    );
  }
}

LogoutComponent.propTypes = propTypes;
LogoutComponent.defaultProps = defaultProps;

export default withRouter(LogoutComponent);
