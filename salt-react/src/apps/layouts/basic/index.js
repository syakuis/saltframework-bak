import React from 'react';
import PropTypes from 'prop-types';
import update from 'react-addons-update';
import shortid from 'shortid';
import DynamicImport from 'Utils/dynamic-import';

import * as Components from './components';

import './layout.css';

const propTypes = {
  children: PropTypes.node,
  tabDefault: PropTypes.object,
};

const defaultProps = {
  children: '',
  tabDefault: {
    title: 'default',
    id: shortid.generate(),
    order: 0,
    content: '',
  },
};

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.addTab = this.addTab.bind(this);
    this.changeTab = this.changeTab.bind(this);
    this.changeTabContent = this.changeTabContent.bind(this);

    this.state = {
      menus: [
        { title: '홈', url: '/' },
        { title: '마이페이지', url: '/mypage' },
        { title: '로그인', url: '/login' },
      ],
      tabs: {
        [this.props.tabDefault.id]: this.props.tabDefault,
      },
      tabId: this.props.tabDefault.id,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      tabs: update(this.state.tabs, {
        [this.state.tabId]: {
          $set: {
            ...this.state.tabs[this.state.tabId],
            content: nextProps.children,
          },
        },
      }),
    });
  }

  addTab(e) {
    e.preventDefault();

    const id = shortid.generate();
    const tab = Object.assign({}, this.props.tabDefault, {
      id,
      order: this.state.tabs.lenght + 1,
    });

    this.setState({
      tabs: {
        ...this.state.tabs,
        [id]: tab,
      },
      tabId: id,
    });
  }

  changeTab(e, id) {
    e.preventDefault();

    this.setState({
      tabId: id,
    });
  }

  changeTabContent(e, path) {
    e.preventDefault();

    const content = path === null ? '' : <DynamicImport path={path} />;

    this.setState({
      tabs: {
        ...this.state.tabs,
        [this.state.tabId]: {
          ...this.state.tabs[this.state.tabId],
          content,
        },
      },
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <Components.Header menus={this.state.menus} />
          <a href="" onClick={e => this.changeTabContent(e, 'modules/login/index.js')}>good</a>
          <a href="" onClick={e => this.changeTabContent(e, 'modules/main/index.js')}>good2</a>
          <ul className="nav nav-tabs">
            {
              Object.keys(this.state.tabs).map((id) => {
                const tab = this.state.tabs[id];
                return (
                  <li key={tab.id} className={tab.id === this.state.tabId ? 'active' : ''}>
                    <a href="" onClick={e => this.changeTab(e, tab.id)}>{tab.title}</a>
                  </li>
                );
              })
            }
            <li>
              <a href="" onClick={this.addTab}><i className="fa fa-plus" /></a>
            </li>
          </ul>
          {
            Object.keys(this.state.tabs).map((id) => {
              const tab = this.state.tabs[id];
              const display = tab.id === this.state.tabId ? 'block' : 'none';
              return (
                <div key={`content_${tab.id}`} className="container-fluid" style={{ minHeight: 500, display }}>
                  {tab.content}
                </div>
              );
            })
          }

          <Components.Footer />
        </div>
      </div>
    );
  }
}

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;
