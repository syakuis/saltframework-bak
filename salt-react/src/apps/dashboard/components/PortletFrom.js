import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  idx: PropTypes.string.isRequired,
  dashboard: PropTypes.object.isRequired,
  onModalClose: PropTypes.func.isRequired,
  updatePortlet: PropTypes.func.isRequired,
};

class PortletUpdate extends React.Component {

  constructor(props) {
    super(props);

    this.initDataBind = this.initDataBind.bind(this);
    this.onUpdatePortlet = this.onUpdatePortlet.bind(this);
    this.state = {
      ...this.props.dashboard[this.props.idx],
    };
  }

  onUpdatePortlet() {
    this.props.updatePortlet(this.state);
    this.props.onModalClose();
  }

  initDataBind(e) {
    let datatype = e.target.attributes.getNamedItem('datatype');
    let value = e.target.value;

    if (datatype != null) {
      datatype = datatype.value;
    }

    switch (e.target.type) {
      case 'checkbox':
        value = e.target.checked;
        break;
      default:
        break;
    }

    switch (datatype) {
      case 'number':
        value = parseFloat(value);
        break;
      case 'boolean':
        if (typeof value === 'boolean') value = Boolean(value);
        break;
      default:
    }

    this.setState({ [e.target.name]: value });
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
              onClick={this.onModalClose}
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
            onChange={this.initDataBind}
            value={this.state.padding}
          />
        </div>

        <div className="form-group">
          <label htmlFor="static">static</label>
          <label htmlFor="static" className="checkbox-inline">
            <input
              type="checkbox"
              name="static"
              datatype="boolean"
              checked={this.state.static}
              onChange={this.initDataBind}
            /> 사용
           </label>
        </div>
        <div className="form-group">
          <label htmlFor="draggable">draggable</label>
          <label htmlFor="draggable" className="checkbox-inline">
            <input
              type="checkbox"
              name="isDraggable"
              datatype="boolean"
              onChange={this.initDataBind}
              checked={this.state.isDraggable}
            /> 사용
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="resizable">resizable</label>
          <label htmlFor="resizable" className="checkbox-inline">
            <input
              type="checkbox"
              name="isResizable"
              datatype="boolean"
              onChange={this.initDataBind}
              checked={this.state.isResizable}
            /> 사용
          </label>
        </div>
        <button
          className="btn btn-default"
          type="button"
          onClick={this.onUpdatePortlet}
        >저장</button>&nbsp;
        <button
          className="btn btn-default"
          type="button"
          onClick={this.props.onModalClose}
        >닫기</button>
      </div>
    );
  }
}

PortletUpdate.propTypes = propTypes;

const mapStateToProps = state => ({
  dashboard: state.dashboard.dashboard,
});

const mapDispatchToProps = dispatch => ({
  updatePortlet: portlet => dispatch(updatePortlet(portlet)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PortletUpdate);
