import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  component: PropTypes.func.isRequired,
  idx: PropTypes.string.isRequired, // layout: i = idx
  padding: PropTypes.number.isRequired,
  config: PropTypes.object.isRequired,
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

    const CreateComponent = this.props.component;

    return (
      <div
        className="pull-portlet portlet-editor"
        style={{ padding }}
        onMouseOver={() => this.showContextMenu(true)}
        onMouseOut={() => this.showContextMenu(false)}
      >
        <CreateComponent
          className="pull-portlet"
          idx={this.props.idx}
          portletConfig={this.props.config}
          isShowContextMenu={this.state.isShowContextMenu}
        />
      </div>
    );
  }
}

CreatePortletComponent.propTypes = propTypes;

export default CreatePortletComponent;
