import React from 'react';

const propTypes = { };
const defaultProps = { };

const Container = () => (
  <iframe
    title="good"
    src="http://daum.net"
    width="100%"
    height="100%"
    style={{ border: 'none', overflow: 'hidden' }}
  />
);

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
