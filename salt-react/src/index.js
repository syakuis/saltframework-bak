import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, browserHistory, Route } from 'react-router-dom';
import shortid from 'shortid';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

import '_resources/css/common.css';
import '_resources/css/non-responsive.css';

// import { RouteWithSubRoutes } from '_utils/router';

const routes = [
  {
    path: '/',
    component: 'dashboard',
    strict: true,
    exact: true,
  },
  {
    path: '/2',
    component: 'dashboard2',
    strict: false,
    exact: false,
  },
];


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

const Dashboard = asyncComponent(() => import('./apps/dashboard').then(module => module.default));

const RouteWithSubRoutes = (route) => {
  const path = `./apps/${route.component}`;
  const Component = asyncComponent(() => import('./apps/dashboard').then(module => module.default));

  return (
    <Route
      exact={route.exact}
      strict={route.strict}
      path={route.path}
      render={props => (
        <Dashboard {...props} />
      )}
    />
  );
};

class App {
  static main() {
    render(
      <Router history={browserHistory}>
        <div>
          {routes.map(route => (
            <RouteWithSubRoutes key={shortid.generate()} {...route} />
          ))}
        </div>
      </Router>,
      document.getElementById('app'),
    );
  }
}

App.main();
