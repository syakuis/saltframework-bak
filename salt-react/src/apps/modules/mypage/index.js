import React from 'react';

const propTypes = { };
const defaultProps = { };

const Container = () => (
  <div>
    <iframe
      title="good"
      src="http://aintop.co.kr"
      width="100%"
      height="100%"
      style={{ border: 'none', overflow: 'hidden' }}
    />
  </div>
);

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
