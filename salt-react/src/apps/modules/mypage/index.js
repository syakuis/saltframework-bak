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
      const result = response.data;
      if (result.code === 401) {
        this.setState({ redirect: true });
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
