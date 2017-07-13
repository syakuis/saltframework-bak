import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

    this.actChange = this.actChange.bind(this);
  }

  actChange(val) {
    console.log(val, this.props);
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

const store = state => ({
  menus: state.view.menus.MENU0000000000000003,
});

export default connect(store, undefined)(Layout);
