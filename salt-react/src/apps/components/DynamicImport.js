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
      loading: true,
    };

    this.load(props.path);
  }

  componentWillReceiveProps(nextProps) {
    this.load(nextProps.path);
  }

  load(path) {
    System.import(`../${path}`).then((module) => {
      this.Component = module.default;
      this.setState({ loading: false });
    });
  }

  render() {
    if (this.state.loading) return null;
    return (
      <this.Component />
    );
  }
}

DynamicImport.propTypes = propTypes;

export default DynamicImport;
