/**
 * @date 2017-02-21
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  portletConfig: PropTypes.object.isRequired,
};

function createMarkup(data) {
  return { __html: data };
}

const View = props => (
  <div className="pull-portlet" dangerouslySetInnerHTML={createMarkup(props.portletConfig.data)} />
);

View.propTypes = propTypes;

export default View;
