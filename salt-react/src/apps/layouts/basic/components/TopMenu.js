import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import { Link } from 'react-router-dom';

const propTypes = {
  menus: PropTypes.array.isRequired,
};
const defaultProps = {};

const TopMenu = props => (
  <nav>
    <ul className="nav nav-pills pull-right">
      {
        props.menus.map(menu => (
          <li key={shortid.generate()} role="presentation"><Link to={menu.url}>{menu.title}</Link></li>
        ))
      }
    </ul>
  </nav>
);

TopMenu.propTypes = propTypes;
TopMenu.defaultProps = defaultProps;

export default TopMenu;
