import React from 'react';
import { Link } from 'react-router-dom';
import Cookie from 'js-cookie';

const MenuComponent = () => (
  <ul>
    <li><Link to="/">Home</Link></li>
    {
      Cookie.get('isAuthentication') ?
        <li><Link to="/logout">Logout</Link></li> :
        <li><Link to="/login">Login</Link></li>
    }
    <li><Link to="/mypage">Mypage</Link></li>
  </ul>
);

export default MenuComponent;
