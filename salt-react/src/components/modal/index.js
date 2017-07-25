import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

ReactModal.defaultStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    zIndex: 19,
  },
  content: {
    position: 'absolute',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '10px',
    outline: 'none',
    padding: '20px',

    width: '50%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 20,
  },
};

const setStyle = (style) => {
  ReactModal.defaultStyles = Object.assign({}, ReactModal.defaultStyles, style);
};

const propTypes = {
  isHeader: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.node,
  onRequestClose: PropTypes.func.isRequired,
};

const defaultProps = {
  isHeader: true,
  title: '',
  children: '',
};


const Modal = props => (
  <ReactModal {...props}>
    {
      props.isHeader ?
        <div className="page-header">
          <h4>
            <i
              className="fa fa-times pull-right"
              aria-hidden="true"
              role="button"
              onClick={props.onRequestClose}
            />
            {props.title}
          </h4>
        </div> : ''
    }
    {props.children}
  </ReactModal>
);

Modal.propTypes = propTypes;

Modal.defaultProps = defaultProps;

export default Modal;
export { setStyle };
