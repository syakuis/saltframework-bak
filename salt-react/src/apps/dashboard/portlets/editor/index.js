/**
 * @date 2017-02-21
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  text: PropTypes.string.isRequired,
};

function createMarkup(text) {
  return { __html: text };
}

const Editor = props => (
  <div className="pull-portlet" dangerouslySetInnerHTML={createMarkup(props.text)} />
);

Editor.propTypes = propTypes;

export default Editor;
