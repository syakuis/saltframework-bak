import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'hover.css/css/hover.css';

import TabComponent from '_components/tab';

import Header from './components/Header';
import Footer from './components/Footer';

import './style.css';

import headerLogoImage from './images/logo.gif';
import footerLogoImage from './images/footer_logo.png';

const propTypes = {
  children: PropTypes.node,
  menus: PropTypes.object.isRequired,
  isTabPanel: PropTypes.bool.isRequired,
};

const defaultProps = {
  children: '',
};

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.change = this.change.bind(this);

    this.state = {
      target: 'demo',
      title: '메인',
    };
  }

  change(e, target, title) {
    e.preventDefault();
    this.setState({
      target,
      title,
    });
  }

  render() {
    return (
      <div>
        <Header logoImage={headerLogoImage} menus={this.props.menus.MENU0000000000000003} />
        {
          this.props.isTabPanel ? (
            <div className="row">
              <div className="col-xs-3">
                <ul className="nav nav-pills nav-stacked">
                  <li role="presentation">
                    <a href="" onClick={e => this.change(e, 'demo', '데모')}>데모</a>
                  </li>
                  <li role="presentation">
                    <a href="" onClick={e => this.change(e, 'dashboard', '대시보드')}>대시보드</a>
                  </li>
                  <li role="presentation">
                    <a href="" onClick={e => this.change(e, 'dashboard2', '테스트')}>테스트</a>
                  </li>
                </ul>
              </div>
              <div className="col-xs-9">
                <TabComponent target={this.state.target} title={this.state.title} />
              </div>
            </div>
          ) : (
            <div id="container" className="container">{this.props.children}</div>
          )
        }
        <Footer logoImage={footerLogoImage} />
      </div>
    );
  }
}

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

const store = state => (state.view);

export default connect(store, undefined)(Layout);
