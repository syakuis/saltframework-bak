import React from 'react';

import TabContainer from 'Components/TabContainer';
import Login from 'Modules/login';

class Container extends React.Component {
  constructor(props) {
    super(props);

    this.change = this.change.bind(this);

    this.state = {
      target: null,
      title: null,
    };
  }

  change(e, target, title) {
    e.preventDefault();
    this.setState({
      target,
      title,
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-3">
          <ul className="nav nav-pills nav-stacked">
            <li role="presentation">
              <a href="" onClick={e => this.change(e, Login, '로그인')}>good</a>
            </li>
            <li role="presentation">
              <a href="" onClick={e => this.change(e, 'modules/main/index.js', '메인')}>good2</a>
            </li>
            <li role="presentation">
              <a href="" onClick={e => this.change(e, 'modules/mypage/index.js', '마이페이지')}>good2</a>
            </li>
          </ul>
        </div>
        <div className="col-xs-9">
          <TabContainer target={this.state.target} title={this.state.title} />
        </div>
      </div>
    );
  }
}

export default Container;
