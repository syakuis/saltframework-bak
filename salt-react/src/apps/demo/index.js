import React, { Component } from 'react';
import shortid from 'shortid';

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

    this.state = {
      todo: '',
      todos: [],
    };
  }

  input(e) {
    this.setState({ todo: e.target.value });
  }

  add() {
    this.setState({
      todo: '',
      todos: [
        ...this.state.todos,
        this.state.todo,
      ],
    });
  }

  del(index) {
    const todos = Object.assign([], this.state.todos);
    todos.splice(index, 0);
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
          {this.state.todos.map((todo, index) => (
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

export default Demo;
