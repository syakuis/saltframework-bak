import React from 'react';
import PropTypes from 'prop-types';

import CreatePortletComponent from './CreatePortletComponent';

const propTypes = {
  portlets: PropTypes.object.isRequired,
};

const GridPortlet = (props) => {
  console.log(props.portlets);
  const portlets = Object.keys(props.portlets).map((key) => {
    const { layout, component, ...portlet } = props.portlets[key];
    return (
      <div key={layout.i} data-grid={layout}>
        <CreatePortletComponent
          component={component}
          i={layout.i}
          padding={layout.padding}
          {...portlet}
        />
      </div>
    );
  });

  return <div>{portlets}</div>;
};

GridPortlet.propTypes = propTypes;

export default GridPortlet;
