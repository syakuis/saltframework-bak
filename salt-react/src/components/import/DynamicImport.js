import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  path: PropTypes.string.isRequired,
};

class DynamicImport extends React.Component {
  constructor(props) {
    super(props);

    this.load = this.load.bind(this);

    this.state = {
      Component: null,
    };

    this.load(props.path);
  }

  componentWillReceiveProps(nextProps) {
    this.load(nextProps.path);
  }

  load(path) {
    import(`_apps/${path}/index.js`).then((module) => {
      this.Component = module.default;
      this.setState({ Component: module.default });
    });
  }

  render() {
    const { Component } = this.state;
    if (Component) return <Component {...this.props} />;
    return null;
  }
}

DynamicImport.propTypes = propTypes;

export default DynamicImport;
