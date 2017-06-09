import React from 'react';
import PropTypes from 'prop-types';

import * as Components from './components';

import './layout.css';

const propTypes = {
  children: PropTypes.node,
};
const defaultProps = {
  children: '',
};

const menus = [
  { title: '홈', url: '/' },
  { title: '마이페이지', url: '/mypage' },
  { title: '로그인', url: '/login' },
];

const Layout = props => (
  <div className="container">
    <Components.Header menus={menus} />
    <div className="container-fluid" style={{ minHeight: 500 }}>
      {props.children}
    </div>
    <Components.Footer />
  </div>
);

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;
