import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
  isShowContextMenu: PropTypes.bool.isRequired,
  idx: PropTypes.string.isRequired,
  copyPortlet: PropTypes.func.isRequired,
  deletePortlet: PropTypes.func.isRequired,
};

const defaultProps = {
  isShowContextMenu: false,
  children: '',
};

class ContextMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
    };
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
      </div>
    );
  }
}

ContextMenu.propTypes = propTypes;
ContextMenu.defaultProps = defaultProps;

export default ContextMenu;
