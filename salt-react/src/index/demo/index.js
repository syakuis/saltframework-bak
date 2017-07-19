import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Parent = (props) => {
  console.log(props);
  return (<div>good</div>);
};

Parent.propTypes = {
  children: PropTypes.node.isRequired,
};

const Child = (props) => {
  console.log(props);
  return (<div>{props.name}</div>);
};

Child.propTypes = {
  name: PropTypes.string.isRequired,
};

class DemoIndex extends Component {
  constructor(props) {
    super(props);

    this.nameChange = this.nameChange.bind(this);

    this.state = {
      name: '',
    };
  }

  nameChange(e) {
    this.setState({
      name: e.target.value,
    });
  }
  render() {
    return (
      <div>
        <input type="text" onChange={this.nameChange} value={this.state.name} />
        good
        <Parent>
          <Child {...this.state} />
        </Parent>
      </div>
    );
  }
}

export default DemoIndex;
