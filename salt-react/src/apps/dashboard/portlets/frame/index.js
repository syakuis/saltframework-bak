/**
 * @date 2017-02-21
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  src: PropTypes.string.isRequired,
};

const Frame = props => (
  <div className="pull-portlet">
    <iframe
      title="portalFrame"
      src={props.src}
      width="100%"
      height="100%"
      style={{ border: 'none', overflow: 'hidden' }}
    />
  </div>
);

Frame.propTypes = propTypes;

export default Frame;
