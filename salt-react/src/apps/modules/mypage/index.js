import React from 'react';
import Ajax from 'Utils/ajax';

class Container extends React.Component {
  constructor(props) {
    super(props);

    this.ajax = Ajax.instance();
    this.state = {
      on: false,
    };
  }

  componentDidMount() {
    this.ajax.get('/member/mypage').then((response) => {
      Ajax.responseErrorHandler(response);
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

export default Container;
