import React from 'react';
import PropTypes from 'prop-types';

import TopMenu from './TopMenu';

const propTypes = {
  menus: PropTypes.array.isRequired,
};
const defaultProps = { };

const Header = props => (
  <div className="header clearfix">
    <TopMenu menus={props.menus} />
    <h3 className="text-muted">Syaku</h3>
  </div>
);

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
