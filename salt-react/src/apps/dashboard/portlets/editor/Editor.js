/**
 * @date 2017-02-21
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 */

import React from 'react';
import PropTypes from 'prop-types';

import Ckeditor from '_components/editor/Ckeditor';

const propTypes = {
  idx: PropTypes.string.isRequired,
  portletConfig: PropTypes.object.isRequired,
  updatePortletConfig: PropTypes.func.isRequired,
};

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.onCkeditorData = this.onCkeditorData.bind(this);
  }

  onCkeditorData(data) {
    this.props.updatePortletConfig({
      ...this.props.portletConfig,
      data,
    });
  }

  render() {
    return (
      <div className="pull-portlet">
        <Ckeditor
          elementId={this.props.idx}
          inline
          onRequestData={this.onCkeditorData}
          data={this.props.portletConfig.data}
        />
      </div>
    );
  }
}

Editor.propTypes = propTypes;

export default Editor;
