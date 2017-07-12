import React from 'react';
import { Route } from 'react-router-dom';

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


const RouteWithSubRoutes = (route) => {
  const Component = asyncComponent(() =>
    System.import(`./apps/${route.component}/index.js`).then(module => module.default),
  );

  console.log(Component);

  return (
    <Route
      exact={route.exact}
      strict={route.strict}
      path={route.path}
      render={props => (
        <Component {...props} />
      )}
    />
  );
};

export { asyncComponent, RouteWithSubRoutes };
