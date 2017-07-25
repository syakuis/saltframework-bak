import React from 'react';
import PropTypes from 'prop-types';

import * as componentPortlets from '../portlets';

const propTypes = {
  deletePortlet: PropTypes.func.isRequired,
  setPortletConfig: PropTypes.func.isRequired,
  setPortletOptions: PropTypes.func.isRequired,
  copyPortlet: PropTypes.func.isRequired,
  portlet: PropTypes.object.isRequired,
  idx: PropTypes.string.isRequired, // layout: i = idx
  padding: PropTypes.number.isRequired,
};

class CreatePortletComponent extends React.Component {
  constructor(props) {
    super(props);

    this.showContextMenu = this.showContextMenu.bind(this);

    this.state = {
      isShowContextMenu: false,
    };
  }

  showContextMenu(show) {
    this.setState({ isShowContextMenu: show });
  }

  render() {
    let padding = this.props.padding;
    if (padding < 0) {
      padding = 0;
    }

    const CreateComponent = componentPortlets[this.props.portlet.componentName];

    return (
      <div
        className="pull-portlet portlet-editor"
        style={{ padding }}
        onMouseOver={() => this.showContextMenu(true)}
        onMouseOut={() => this.showContextMenu(false)}
      >
        <CreateComponent
          className="pull-portlet"
          {...this.props.portlet.options}
          portlet={this.props.portlet}
          idx={this.props.idx}
          isShowContextMenu={this.state.isShowContextMenu}
          setPortletConfig={this.props.setPortletConfig}
          setPortletOptions={this.props.setPortletOptions}
          copyPortlet={this.props.copyPortlet}
          deletePortlet={this.props.deletePortlet}
        />
      </div>
    );
  }
}

CreatePortletComponent.propTypes = propTypes;

export default CreatePortletComponent;
