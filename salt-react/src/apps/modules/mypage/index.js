import React from 'react';
import Ajax from 'Utils/ajax';
import Login from 'Modules/login';

class Container extends React.Component {
  constructor(props) {
    super(props);

    this.ajax = Ajax.instance();
    this.state = {
      redirect: true,
    };
  }

  componentDidMount() {
    this.ajax.get('/member/mypage').then((response) => {
      const { code } = response;
      console.log(code);
      if (code !== 401) {
        this.setState({ redirect: false });
      }
    });
  }

  render() {
    return (
      <div>
        { this.state.redirect ? <Login /> : 'good' }
      </div>
    );
  }
}

export default Container;
