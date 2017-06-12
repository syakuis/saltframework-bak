import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import DynamicImport from './DynamicImport';

const propTypes = {
  tabDefault: PropTypes.object,
  target: PropTypes.any,
};

const defaultProps = {
  tabDefault: {
    title: 'default',
    id: shortid.generate(),
    order: 0,
    content: '',
  },
  target: null,
};

class TabContainer extends React.Component {
  constructor(props) {
    super(props);

    this.addTab = this.addTab.bind(this);
    this.changeTab = this.changeTab.bind(this);
    this.changeTabContent = this.changeTabContent.bind(this);

    this.state = {
      tabs: {
        [this.props.tabDefault.id]: this.props.tabDefault,
      },
      tabId: this.props.tabDefault.id,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.changeTabContent(nextProps.target);
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

  changeTabContent(target) {
    let content = '';
    if (target !== null) {
      content = typeof target === 'string' ? <DynamicImport path={target} /> : <content />;
    }

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
      </div>
    );
  }
}

TabContainer.propTypes = propTypes;
TabContainer.defaultProps = defaultProps;

export default TabContainer;
