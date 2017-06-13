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
  { title: '페이지', url: '/page' },
  { title: '로그인', url: '/login' },
];

const Layout = props => (
  <div>
    <div className="container">
      <Components.Header menus={menus} />
      {props.children}
      <Components.Footer />
    </div>
  </div>
);

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;
