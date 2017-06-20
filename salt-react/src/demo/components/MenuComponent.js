import React from 'react';
import { Link } from 'react-router-dom';
import Cookie from 'js-cookie';

import Logout from './LogoutComponent';

const MenuComponent = () => (
  <ul>
    <li><Link to="/">Home</Link></li>
    {
      Cookie.get('isAuthentication') ?
        <li><Logout /></li> :
        <li><Link to="/login">Login</Link></li>
    }
    <li><Link to="/mypage">Mypage</Link></li>
  </ul>
);

export default MenuComponent;
