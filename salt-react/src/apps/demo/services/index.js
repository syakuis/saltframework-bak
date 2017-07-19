import shortid from 'shortid';

class DemoService {
  constructor(props) {
    this.props = props;
    this.id = shortid.generate();
    this.key = 'todos';
  }

  getId() {
    return this.id;
  }

  getKey() {
    return this.key;
  }

  create() {
    this.props.createRepo(this.id, {
      todos: [],
    });
  }

  todos(repo) {
    if (Object.prototype.hasOwnProperty.call(repo, this.id) &&
        Object.prototype.hasOwnProperty.call(repo, this.key)) {
      return repo[this.id][this.key];
    }

    return [];
  }

  add(todo) {
    this.props.arrayPushRepo(this.id, this.key, todo);
  }

  del(index) {
    this.props.arraySpliceRepo(this.id, this.key, index);
  }
}

export default DemoService;
