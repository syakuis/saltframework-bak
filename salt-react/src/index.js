import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom';
import shortid from 'shortid';

import ajax from 'Utils/ajax';
import Layout from 'Layouts/basic';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

ajax.setDefaultConfig({ baseURL: API_SERVER_PATH });

const asyncComponent = getComponent => (
  class AsyncComponent extends React.Component {
    constructor() {
      super();
      this.state = { Component: AsyncComponent.Component };
    }
    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then((Component) => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        });
      }
    }
    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return null;
    }
  }
);

const routes = [
  {
    path: '/',
    component: 'main',
  },
  {
    path: '/mypage',
    component: 'mypage',
  },
  {
    path: '/login',
    component: 'login',
  },
  {
    path: '/page',
    component: 'page',
  },
];

const RouteWithSubRoutes = (route) => {
  const Component = asyncComponent(() =>
    System.import(`./apps/modules/${route.component}/index.js`).then(module => module.default),
  );

  return (
    <Route
      exact
      path={route.path}
      render={props => (
        <Component {...props} />
      )}
    />
  );
};

class App {
  static main() {
    render(
      <Router history={browserHistory}>
        <Layout>
          {routes.map(route => (
            <RouteWithSubRoutes key={shortid.generate()} {...route} />
          ))}
        </Layout>
      </Router>,
      document.getElementById('app'),
    );
  }
}

App.main();
