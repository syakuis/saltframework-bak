import React from 'react';
import Ajax from 'Utils/ajax';

class MypageComponent extends React.Component {
  constructor(props) {
    super(props);

    this.ajax = Ajax.instance();

    this.state = {
      response: '',
    };
  }

  componentDidMount() {
    this.ajax.get('/member/user').then((response) => {
      this.setState({
        response,
      });
    });
  }

  render() {
    return (
      <div>
        good
      </div>
    );
  }
}

export default MypageComponent;
