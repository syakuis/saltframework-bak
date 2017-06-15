/**
 * @date 2017-06-13 15:52:33
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 */

import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import DynamicImport from './DynamicImport';

const propTypes = {
  tabDefault: PropTypes.object,
  target: PropTypes.any,
  title: PropTypes.string,
};

const defaultProps = {
  tabDefault: {
    title: 'default',
    id: shortid.generate(),
    order: 0,
    content: '',
  },
  target: null,
  title: 'default',
};

class TabContainer extends React.Component {
  constructor(props) {
    super(props);

    this.addTab = this.addTab.bind(this);
    this.changeTab = this.changeTab.bind(this);
    this.changeTabContent = this.changeTabContent.bind(this);
    this.closeTab = this.closeTab.bind(this);

    this.state = {
      tabs: {
        [this.props.tabDefault.id]: this.props.tabDefault,
      },
      tabId: this.props.tabDefault.id,
      tabCount: 1,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { target, title } = nextProps;
    this.changeTabContent({ target, title });
  }

  /**
   * 탭을 추가한다.
   * @param {*} e
   */
  addTab(e) {
    e.preventDefault();

    const id = shortid.generate();
    const tabCount = this.state.tabCount + 1;
    const tab = Object.assign({}, this.props.tabDefault, {
      id,
      order: tabCount,
    });

    this.setState({
      tabs: {
        ...this.state.tabs,
        [id]: tab,
      },
      tabId: id,
      tabCount,
    });
  }

  closeTab(e, id) {
    e.preventDefault();
    e.stopPropagation();
    const tabs = Object.assign({}, this.state.tabs);
    delete tabs[id];

    let tabId = this.state.tabId;

    if (tabId === id) {
      tabId = Object.keys(tabs).pop();
    }

    this.setState({ tabId, tabs });
  }

  /**
   * 선택된 탭을 활성화한다.
   * @param {*} e
   * @param {*} id
   */
  changeTab(e, id) {
    e.preventDefault();

    this.setState({
      tabId: id,
    });
  }
  /**
   * 선택된 탭에 컨텍스트를 변경한다.
   * @param {*} props
   */
  changeTabContent(props) {
    const { target, title } = props;
    let content = '';
    if (target !== null) {
      switch (typeof target) {
        case 'string':
          content = <DynamicImport path={target} />;
          break;
        case 'function':
          content = target();
          break;
        default:
          content = target.default;
      }
    }

    this.setState({
      tabs: {
        ...this.state.tabs,
        [this.state.tabId]: {
          ...this.state.tabs[this.state.tabId],
          content,
          title,
        },
      },
    });
  }

  render() {
    return (
      <div>
        <ul className="nav nav-tabs">
          <li>
            <a href="" onClick={this.addTab}><i className="fa fa-plus" /></a>
          </li>
          {
            Object.keys(this.state.tabs).map((id) => {
              const tab = this.state.tabs[id];
              return (
                <li key={tab.id} className={tab.id === this.state.tabId ? 'active' : ''}>
                  <a href="" onClick={e => this.changeTab(e, tab.id)}>
                    {tab.title}&nbsp;
                    <i
                      role="button"
                      tabIndex={0}
                      className="fa fa-close"
                      onClick={e => this.closeTab(e, tab.id)}
                    />
                  </a>
                </li>
              );
            })
          }
        </ul>
        {
          Object.keys(this.state.tabs).map((id) => {
            const tab = this.state.tabs[id];
            const display = tab.id === this.state.tabId ? 'block' : 'none';
            return (
              <div key={`content_${tab.id}`} style={{ minHeight: 500, display }}>
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
