import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  portlet: PropTypes.object.isRequired,
  onModalClose: PropTypes.func.isRequired,
  setPortletConfig: PropTypes.func.isRequired,
};

class PortletForm extends React.Component {

  constructor(props) {
    super(props);

    this.onChangePadding = this.onChangePadding.bind(this);
    this.onChangePadding = this.onChangePadding.bind(this);
    this.setPortletConfig = this.setPortletConfig.bind(this);

    this.state = props.portlet.config;
  }

  onChangePadding(e) {
    this.setState({
      padding: e.target.value,
    });
  }

  onChangeChecked(e, name) {
    this.setState({
      [name]: e.target.checked,
    });
  }

  setPortletConfig() {
    this.props.setPortletConfig(this.state);
    this.props.onModalClose();
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <h4>
            <i
              className="fa fa-times pull-right"
              aria-hidden="true"
              role="button"
              onClick={this.props.onModalClose}
            />
            포틀릿 설정
          </h4>
        </div>
        <div className="form-group">
          <label htmlFor="padding">padding</label>
          <input
            type="text"
            className="form-control"
            placeholder="padding"
            name="padding"
            datatype="number"
            onChange={this.onChangePadding}
            value={this.state.padding}
          />
        </div>

        <div className="checkbox">
          <label htmlFor="static" className="checkbox-inline">
            <input id="static" type="checkbox" onChange={e => this.onChangeChecked(e, 'static')} checked={this.state.static} /> static
          </label>
          <label htmlFor="isDraggable" className="checkbox-inline">
            <input id="isDraggable" type="checkbox" onChange={e => this.onChangeChecked(e, 'isDraggable')} checked={this.state.isDraggable} /> draggable
          </label>
          <label htmlFor="isResizable" className="checkbox-inline">
            <input id="isResizable" type="checkbox" onChange={e => this.onChangeChecked(e, 'isResizable')} checked={this.state.isResizable} /> resizable
          </label>
        </div>

        <div className="text-center">
          <button
            className="btn btn-success"
            type="button"
            onClick={this.setPortletConfig}
          ><i className="fa fa-check" aria-hidden="true" /> 저장</button>&nbsp;
        </div>
      </div>
    );
  }
}

PortletForm.propTypes = propTypes;

export default PortletForm;
