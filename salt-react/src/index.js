import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom';
import Toast from 'modern-toastr';

import 'modern-toastr/dist/modern-toastr.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

import ajax from 'Utils/ajax';
import PrivateRoute from 'Components/PrivateRoute';

import Menu from './demo/components/MenuComponent';
import Login from './demo/components/LoginComponent';
import Main from './demo/components/MainComponent';
import Mypage from './demo/components/MypageComponent';

ajax.setDefaultConfig({ baseURL: API_SERVER_PATH });

Toast.setDefaultConfig({
  timeOut: 5000,
  closeButton: true,
  newestOnTop: true,
  progressBar: true,
});

class App {
  static main() {
    render(
      <Router history={browserHistory}>
        <div>
          <Menu />
          <hr />

          <Route exact path="/" component={Main} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/mypage" component={Mypage} />
        </div>
      </Router>,
      document.getElementById('app'),
    );
  }
}

App.main();
