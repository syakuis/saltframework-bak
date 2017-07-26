import React from 'react';
import PropTypes from 'prop-types';
import * as componentPortlets from '../portlets/views';

const propTypes = {
  portlet: PropTypes.object.isRequired,
  idx: PropTypes.string.isRequired, // layout: i = idx
  padding: PropTypes.number.isRequired,
};

const ViewPortletComponent = (props) => {
  const padding = props.padding < 0 ? 0 : props.padding;

  const CreateComponent = componentPortlets[props.portlet.componentName];

  return (
    <div
      className="pull-portlet"
      style={{ padding }}
    >
      <CreateComponent
        className="pull-portlet"
        {...props.portlet.options}
        portlet={props.portlet}
        idx={props.idx}
      />
    </div>
  );
};

ViewPortletComponent.propTypes = propTypes;

export default ViewPortletComponent;
