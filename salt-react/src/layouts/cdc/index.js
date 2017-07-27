import React from 'react';
import PropTypes from 'prop-types';
import 'hover.css/css/hover.css';

import Header from './components/Header';
import Footer from './components/Footer';

import './style.css';

import headerLogoImage from './images/logo.gif';
import footerLogoImage from './images/footer_logo.png';

const propTypes = {
  children: PropTypes.node,
  menus: PropTypes.array.isRequired,
};

const defaultProps = {
  children: '',
};

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      target: 'demo',
      title: '메인',
    };
  }

  render() {
    return (
      <div>
        <Header logoImage={headerLogoImage} menus={this.props.menus} />
        <div id="container" className="container">{this.props.children}</div>
        <Footer logoImage={footerLogoImage} />
      </div>
    );
  }
}

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;


export default Layout;
