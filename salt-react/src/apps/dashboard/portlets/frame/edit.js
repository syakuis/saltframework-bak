/**
 * @date 2017-02-21
 * @author Seok Kyun. Choi. 최석균 (Syaku)
 * @site http://syaku.tistory.com
 */

import React from 'react';
import PropTypes from 'prop-types';

import Modal from '_components/modal';
import ContextMenu from '../../components/ContextMenu';
import propTypesPortlet from '../propTypes';

const propTypes = {
  ...propTypesPortlet,
  src: PropTypes.string.isRequired,
};

const defaultState = {
  isShowModal: false,
};

class Frame extends React.Component {

  static getDefault() {
    return {
      title: '아이프레임 포틀릿',
      image: null,
      data: {
        src: '',
      },
      config: {
        padding: 0,
        w: 4,
        h: 5,
        x: 0,
        y: Infinity,
        moved: false,
        static: false,
        isDraggable: true,
        isResizable: true,
      },
    };
  }

  constructor(props) {
    super(props);

    this.onModalClose = this.onModalClose.bind(this);
    this.setInputSrc = this.setInputSrc.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      ...defaultState,
      src: props.src,
      inputSrc: props.src,
    };
  }

  onModalClose() {
    this.setState({ isShowModal: !this.state.isShowModal });
  }

  onSubmit() {
    this.setState({
      src: this.state.inputSrc,
    });

    this.props.setPortletData({
      ...this.props.portlet,
      data: {
        src: this.state.inputSrc,
      },
    });

    this.onModalClose();
  }

  setInputSrc(e) {
    this.setState({
      inputSrc: e.target.value,
    });
  }

  render() {
    return (
      <div className="pull-portlet">
        <ContextMenu
          idx={this.props.idx}
          portlet={this.props.portlet}
          copyPortlet={this.props.copyPortlet}
          deletePortlet={this.props.deletePortlet}
          setPortletConfig={this.props.setPortletConfig}
          isShowContextMenu={this.props.isShowContextMenu}
        >
          <button type="button" className="btn btn-default" onClick={this.onModalClose}>
            <i className="fa fa-cog" aria-hidden="true" />
          </button>
        </ContextMenu>
        <iframe
          title="portalFrame"
          src={this.state.src}
          width="100%"
          height="100%"
          style={{ border: 'none', overflow: 'hidden' }}
        />

        <Modal
          contentLabel="iframe"
          title="아이프레임 경로 설정"
          isOpen={this.state.isShowModal}
          onRequestClose={this.onModalClose}
          shouldCloseOnOverlayClick
        >
          <div className="form-group">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="경로를 입력하세요."
                id="inputSrc"
                onChange={this.setInputSrc}
                value={this.state.inputSrc}
              />
              <span className="input-group-btn">
                <button className="btn btn-success" type="button" onClick={this.onSubmit}>
                  <i className="fa fa-check" aria-hidden="true" /> 저장
                </button>
              </span>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

Frame.propTypes = propTypes;

export default Frame;
