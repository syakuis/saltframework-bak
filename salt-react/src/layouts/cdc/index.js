import React from 'react';
import PropTypes from 'prop-types';

import Header from './components/Header';
import Footer from './components/Footer';

import './style.css';

const propTypes = {
  children: PropTypes.node,
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
        <Header />
        <div id="container" className="container">{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;
