import React, { Component } from 'react';
import shortid from 'shortid';
import { connect } from 'react-redux';

import { repoPropTypes, repoStateToProps, repoDispatchToProps } from '_actions/repository';

import DemoService from './services';

const propTypes = {
  ...repoPropTypes,
};

const defaultProps = {
  todo: '',
  todos: [],
};

class Demo extends Component {
  constructor(props) {
    super(props);

    this.input = this.input.bind(this);
    this.add = this.add.bind(this);
    this.del = this.del.bind(this);

    this.demoService = new DemoService(this.props);

    this.state = {
      todo: '',
      todos: [],
    };
  }

  componentWillMount() {
    this.demoService.create();
  }

  input(e) {
    this.setState({ todo: e.target.value });
  }

  add() {
    this.demoService.add(this.state.todo);
    this.setState({ todo: '' });
  }

  del(index) {
    this.demoService.del(index);
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" onChange={this.input} value={this.state.todo} />
          <button className="btn btn-default" type="button" onClick={this.add}>저장</button>
        </div>
        <ul className="list-group">
          {this.demoService.todos(this.props).map((todo, index) => (
            <li className="list-group-item" key={shortid.generate()}>
              <i className="fa fa-close" role="button" tabIndex={0} onClick={() => this.del(index)} />
              {todo}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Demo.defaultProps = defaultProps;
Demo.propTypes = propTypes;

export default connect(repoStateToProps, repoDispatchToProps)(Demo);
