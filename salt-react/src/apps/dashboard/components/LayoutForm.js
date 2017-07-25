import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  whiteSpace: PropTypes.array.isRequired,
  margin: PropTypes.array.isRequired,
  containerPadding: PropTypes.array.isRequired,
  rowHeight: PropTypes.number.isRequired,
  modalClose: PropTypes.func.isRequired,
  setLayoutConfig: PropTypes.func.isRequired,
};

class LayoutForm extends React.Component {
  constructor(props) {
    super(props);

    this.setWhiteSpace = this.setWhiteSpace.bind(this);
    this.setMargin = this.setMargin.bind(this);
    this.setContainerPadding = this.setContainerPadding.bind(this);
    this.setRowHeight = this.setRowHeight.bind(this);

    this.setLayoutConfig = this.setLayoutConfig.bind(this);

    this.state = {
      whiteSpace: props.whiteSpace,
      margin: props.margin,
      containerPadding: props.containerPadding,
      rowHeight: props.rowHeight,
    };
  }

  setWhiteSpace(e, index) {
    let value = parseInt(e.target.value, 0);
    value = isNaN(value) ? 0 : value;

    const whiteSpace = Object.assign([], this.state.whiteSpace);
    whiteSpace[index] = value;

    this.setState({ whiteSpace });
  }

  setMargin(e, index) {
    let value = parseInt(e.target.value, 0);
    value = isNaN(value) ? 0 : value;

    const margin = Object.assign([], this.state.margin);
    margin[index] = value;
    this.setState({ margin });
  }

  setContainerPadding(e, index) {
    let value = parseInt(e.target.value, 0);
    value = isNaN(value) ? 0 : value;

    const containerPadding = Object.assign([], this.state.containerPadding);
    containerPadding[index] = value;
    this.setState({ containerPadding });
  }

  setRowHeight(e) {
    let value = parseInt(e.target.value, 0);
    value = isNaN(value) ? 0 : value;
    this.setState({ rowHeight: value });
  }

  setLayoutConfig() {
    this.props.modalClose();
    this.props.setLayoutConfig(this.state);
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <label htmlFor>여백 조정</label>
          <div className="row">
            <div className="col-xs-3">
              <input
                key="whiteSpace_0"
                type="text"
                className="form-control"
                placeholder="top"
                maxLength={2}
                onChange={e => (this.setWhiteSpace(e, 0))}
                value={this.state.whiteSpace[0]}
              />
            </div>
            <div className="col-xs-3">
              <input
                key="whiteSpace_1"
                type="text"
                className="form-control"
                placeholder="right"
                maxLength={2}
                onChange={e => (this.setWhiteSpace(e, 1))}
                value={this.state.whiteSpace[1]}
              />
            </div>
            <div className="col-xs-3">
              <input
                key="whiteSpace_2"
                type="text"
                className="form-control"
                placeholder="bottom"
                maxLength={2}
                onChange={e => (this.setWhiteSpace(e, 2))}
                value={this.state.whiteSpace[2]}
              />
            </div>
            <div className="col-xs-3">
              <input
                key="whiteSpace_3"
                type="text"
                className="form-control"
                placeholder="left"
                maxLength={2}
                onChange={e => (this.setWhiteSpace(e, 3))}
                value={this.state.whiteSpace[3]}
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="padding">대시보드 안쪽 여백 조정</label>
          <div className="row">
            <div className="col-xs-6">
              <input
                key="containerPadding_0"
                type="text"
                className="form-control"
                placeholder="paddingX"
                onChange={e => (this.setContainerPadding(e, 0))}
                value={this.state.containerPadding[0]}
              />
            </div>
            <div className="col-xs-6">
              <input
                key="containerPadding_1"
                type="text"
                className="form-control"
                placeholder="paddingY"
                onChange={e => (this.setContainerPadding(e, 1))}
                value={this.state.containerPadding[1]}
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="margin">포틀린 간격 조절</label>
          <div className="row">
            <div className="col-xs-6">
              <input
                key="margin_0"
                type="text"
                className="form-control"
                placeholder="marginX"
                onChange={e => (this.setMargin(e, 0))}
                value={this.state.margin[0]}
              />
            </div>
            <div className="col-xs-6">
              <input
                key="margin_1"
                type="text"
                className="form-control"
                placeholder="marginY"
                onChange={e => (this.setMargin(e, 1))}
                value={this.state.margin[1]}
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="height">포틀릿 높이 조절</label>
          <input
            type="text"
            className="form-control"
            placeholder="height"
            onChange={this.setRowHeight}
            value={this.state.rowHeight}
          />
        </div>

        <div className="text-center">
          <button
            className="btn btn-success"
            type="button"
            onClick={this.setLayoutConfig}
          ><i className="fa fa-check" aria-hidden="true" /> 저장</button>&nbsp;
          <button
            className="btn btn-default"
            type="button"
            onClick={this.props.modalClose}
          ><i className="fa fa-times" aria-hidden="true" /> 닫기</button>
        </div>
      </div>
    );
  }
}

LayoutForm.propTypes = propTypes;

export default LayoutForm;
