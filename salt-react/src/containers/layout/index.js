import React, { Component } from 'react';
import PropType from 'prop-types';

const propTypes = {
  children: PropType.node,
};

const defaultProps = {
  children: '',
};

class LayoutContainer extends Component {
  render() {
    return (
      <div>
        헤더
        {this.props.children}
        풋더
      </div>
    );
  }
}

LayoutContainer.propTypes = propTypes;
LayoutContainer.defaultProps = defaultProps;

export default LayoutContainer;
