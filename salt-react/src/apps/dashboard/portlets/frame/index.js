/**
 * @date 2017-02-21
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import ContextMenu from '../../components/ContextMenu';

const propTypes = {
  isShowContextMenu: PropTypes.bool.isRequired,
  idx: PropTypes.string.isRequired,
  portletConfig: PropTypes.object.isRequired,
  // updatePortletConfig: PropTypes.func.isRequired,
};

class Frame extends React.Component {

  static getDefault() {
    return {
      title: '아이프레임 포틀릿',
      image: null,
      portletConfig: {
        src: '',
        width: 0, // 0 = 100%
        height: 0, // 0 = 100%
      },
      options: {
        padding: 0,
        w: 4,
        h: 5,
        x: 0,
        y: Infinity,
        static: false,
        isDraggable: true,
        isResizable: true,
      },
    };
  }

  constructor(props) {
    super(props);

    this.onModalClose = this.onModalClose.bind(this);
    this.onSwitch = this.onSwitch.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      isShowModal: false,
      ...this.props.portletConfig[this.props.idx],
      result: {
        ...this.props.portletConfig[this.props.idx],
      },
    };
  }

  onModalClose() {
    this.setState({ isShowModal: !this.state.isShowModal });
  }

  onSwitch(e) {
    const value = e.target.value;
    switch (e.target.name) {
      case 'src':
        this.setState(() => ({ src: value }));
        break;
      case 'width':
        this.setState(() => ({ width: parseInt(value, 0) }));
        break;
      case 'height':
        this.setState(() => ({ height: parseInt(value, 0) }));
        break;
      default:
    }
  }

  onSubmit() {
    this.setState({
      result: this.state,
    });
    // this.props.updatePortletConfig({
    //   idx: this.props.idx,
    //   src: this.state.src,
    //   width: this.state.width,
    //   height: this.state.height,
    // });
    this.onModalClose();
  }

  render() {
    return (
      <div className="pull-portlet">
        <ContextMenu idx={this.props.idx} isShowContextMenu={this.props.isShowContextMenu}>
          <button type="button" className="btn btn-default" onClick={this.onModalClose}>
            <i className="fa fa-cog" aria-hidden="true" />
          </button>
        </ContextMenu>
        <iframe
          title="portalFrame"
          src={this.state.result.src}
          width={this.state.result.width !== 0 ? this.state.result.width : '100%'}
          height={this.state.result.height !== 0 ? this.state.result.height : '100%'}
          style={{ border: 'none', overflow: 'hidden' }}
        />

        <Modal
          contentLabel="iframe"
          isOpen={this.state.isShowModal}
          onRequestClose={this.onModalClose}
          shouldCloseOnOverlayClick
        >
          <form>
            <div>
              <div className="form-group">
                <label htmlFor="src">경로</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="src"
                  name="src"
                  onChange={this.onSwitch}
                  defaultValue={this.state.src}
                />
              </div>
              <div className="form-group">
                <label htmlFor="width">넓이</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="width"
                  name="width"
                  onChange={this.onSwitch}
                  defaultValue={this.state.width}
                />
              </div>
              <div className="form-group">
                <label htmlFor="height">높이</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="height"
                  name="height"
                  onChange={this.onSwitch}
                  defaultValue={this.state.height}
                />
              </div>
            </div>

            <button className="btn btn-default" type="button" onClick={this.onSubmit}>
              <i className="fa fa-check" aria-hidden="true" /> 저장
            </button>&nbsp;
            <button
              className="btn btn-default"
              type="button"
              onClick={this.onModalClose}
            ><i className="fa fa-times" aria-hidden="true" /> 닫기</button>
          </form>
        </Modal>
      </div>
    );
  }
}

Frame.propTypes = propTypes;

export default Frame;
