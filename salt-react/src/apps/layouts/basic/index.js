import React from 'react';
import PropTypes from 'prop-types';
import TabContainer from 'Components/TabContainer';

import * as Components from './components';

import './layout.css';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
  children: '',
};

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.change = this.change.bind(this);

    this.state = {
      menus: [
        { title: '홈', url: '/' },
        { title: '마이페이지', url: '/mypage' },
        { title: '로그인', url: '/login' },
      ],
      target: null,
    };
  }

  change(e, target) {
    e.preventDefault();

    this.setState({
      target,
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <Components.Header menus={this.state.menus} />
          <a href="" onClick={e => this.change(e, 'modules/login/index.js')}>good</a>
          <a href="" onClick={e => this.change(e, 'modules/main/index.js')}>good2</a>
          <a href="" onClick={e => this.change(e, 'modules/mypage/index.js')}>good2</a>
          <TabContainer target={this.state.target} />
          <Components.Footer />
        </div>
      </div>
    );
  }
}

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;
