const id = 'demo';

class DemoService {
  constructor(props) {
    this.props = props;
  }

  get() {
    return Object.assgin({}, this.props);
  }

  getDemo(key) {
    return Object.assgin({}, this.props[key]);
  }
}

export default DemoService;
export { id };
