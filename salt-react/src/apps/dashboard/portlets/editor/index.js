/**
 * @date 2017-02-21
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 */

import React from 'react';
import PropTypes from 'prop-types';

import Editor from './Editor';
import View from './View';

import screenshot from './images/screenshot.png';

const propTypes = {
  idx: PropTypes.string.isRequired,
  isContextMenuShow: PropTypes.bool.isRequired,
  isView: PropTypes.bool.isRequired,
  portletConfig: PropTypes.object.isRequired,

  updatePortletConfig: PropTypes.func.isRequired,
};

class PageHtml extends React.Component {
  static getDefault() {
    return {
      title: '에디터 포틀릿',
      image: screenshot,
      portletConfig: {
        data: '',
      },
      options: {
        padding: 5,
        w: 12,
        h: 30,
        x: 0,
        y: Infinity,
        static: false,
        isDraggable: true,
        isResizable: true,
      },
    };
  }

  render() {
    if (this.props.isView) {
      return (
        <View
          idx={this.props.idx}
          portletConfig={this.props.portletConfig}
        />
      );
    }
    return (
      <Editor
        idx={this.props.idx}
        isContextMenuShow={this.props.isContextMenuShow}
        updatePortletConfig={this.props.updatePortletConfig}
        portletConfig={this.props.portletConfig}
      />
    );
  }
}

PageHtml.propTypes = propTypes;

export default PageHtml;
