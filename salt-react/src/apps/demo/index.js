import React, { Component } from 'react';
import shortid from 'shortid';
import { connect } from 'react-redux';
import { repoPropTypes, repoStateToProps, repoDispatchToProps } from '_actions/repository';

import Layout from '_layouts/cdc';
import { id } from './services';

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

    props.initRepo(id, {
      todos: [],
    });

    this.input = this.input.bind(this);
    this.add = this.add.bind(this);
    this.del = this.del.bind(this);

    this.state = {
      todo: '',
    };
  }

  input(e) {
    this.setState({ todo: e.target.value });
  }

  add() {
    this.props.arrayPushRepo(id, 'todos', this.state.todo);
    this.setState({ todo: '' });
  }

  del(index) {
    this.props.arraySpliceRepo(id, 'todos', index);
  }

  render() {
    return (
      <Layout>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" onChange={this.input} value={this.state.todo} />
          <button className="btn btn-default" type="button" onClick={this.add}>저장</button>
        </div>
        <ul className="list-group">
          {this.props.todos.map((todo, index) => (
            <li className="list-group-item" key={shortid.generate()}>
              <i className="fa fa-close" role="button" tabIndex={0} onClick={() => this.del(index)} />
              {todo}
            </li>
          ))}
        </ul>
      </Layout>
    );
  }
}

Demo.propTypes = propTypes;
Demo.defaultProps = defaultProps;

export default connect(repoStateToProps(id), repoDispatchToProps)(Demo);
