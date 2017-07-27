/**
 * @date 2017-02-21
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 */

import React from 'react';
import PropTypes from 'prop-types';

import Ckeditor from '_components/editor/Ckeditor';
import propTypesPortlet from '../propTypes';
import ContextMenu from '../../components/ContextMenu';

import screenshot from './images/screenshot.png';

const propTypes = {
  ...propTypesPortlet,
  text: PropTypes.string.isRequired,
};

const defaultState = {
  isShowModal: false,
};


class Editor extends React.Component {
  static getDefault() {
    return {
      title: '에디터 포틀릿',
      image: screenshot,
      data: {
        text: '',
      },
      config: {
        padding: 5,
        w: 12,
        h: 12,
        x: 0,
        y: Infinity,
        static: false,
        isDraggable: true,
        isResizable: true,
      },
    };
  }
  constructor(props) {
    super(props);

    this.onCkeditorText = this.onCkeditorText.bind(this);
  }

  onCkeditorText(text) {
    this.props.setPortletData({
      ...this.props.portlet,
      data: {
        text,
      },
    });
  }

  render() {
    return (
      <div className="pull-portlet">
        <ContextMenu
          idx={this.props.idx}
          portlet={this.props.portlet}
          copyPortlet={this.props.copyPortlet}
          deletePortlet={this.props.deletePortlet}
          setPortletConfig={this.props.setPortletConfig}
          isShowContextMenu={this.props.isShowContextMenu}
        />
        <Ckeditor
          elementId={this.props.idx}
          inline
          onRequestData={this.onCkeditorText}
          data={this.props.text}
        />
      </div>
    );
  }
}

Editor.propTypes = propTypes;
Editor.defaultState = defaultState;

export default Editor;
