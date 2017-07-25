import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from '_components/modal';
import PortletForm from './PortletForm';

const propTypes = {
  children: PropTypes.node,
  isShowContextMenu: PropTypes.bool.isRequired,
  idx: PropTypes.string.isRequired,
  portlet: PropTypes.object.isRequired,
  copyPortlet: PropTypes.func.isRequired,
  deletePortlet: PropTypes.func.isRequired,
  setPortletConfig: PropTypes.func.isRequired,
};

const defaultProps = {
  isShowContextMenu: false,
  children: '',
};

class ContextMenu extends React.Component {
  constructor(props) {
    super(props);

    this.onModalOpen = this.onModalOpen.bind(this);
    this.onModalClose = this.onModalClose.bind(this);

    this.state = {
      modalOpen: false,
    };
  }

  onModalOpen() {
    this.setState({ modalOpen: true });
  }

  onModalClose() {
    this.setState({ modalOpen: false });
  }

  render() {
    return (
      <div className="context-menu" style={{ display: this.props.isShowContextMenu ? '' : 'none' }}>
        <ul className="list-inline">
          <li>
            <button className="btn btn-default draggable-point">
              <span className="fa fa-arrows" aria-hidden="true" />
            </button>
          </li>
          <li>
            <button
              className="btn btn-default"
              onClick={() => this.props.copyPortlet(this.props.idx)}
            >
              <span className="fa fa-clone" aria-hidden="true" />
            </button>
          </li>
          <li>
            <button
              className="btn btn-default"
              onClick={this.onModalOpen}
            >
              <span className="fa fa-crop" aria-hidden="true" />
            </button>
          </li>
          {this.props.children}
          <li>
            <button
              className="btn btn-default"
              onClick={() => this.props.deletePortlet(this.props.idx)}
            >
              <span className="fa fa-trash" aria-hidden="true" />
            </button>
          </li>
        </ul>
        <ReactModal
          title="포틀릿 설정"
          contentLabel={this.props.idx}
          isOpen={this.state.modalOpen}
          onRequestClose={this.onModalClose}
          shouldCloseOnOverlayClick
        >
          <PortletForm
            portlet={this.props.portlet}
            setPortletConfig={this.props.setPortletConfig}
            onModalClose={this.onModalClose}
          />
        </ReactModal>
      </div>
    );
  }
}

ContextMenu.propTypes = propTypes;
ContextMenu.defaultProps = defaultProps;

export default ContextMenu;
