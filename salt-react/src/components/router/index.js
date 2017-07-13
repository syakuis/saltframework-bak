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
      return (
        <div>로드중...</div>
      );
    }
  }
);


const RouteWithSubRoutes = (route) => {
  const Component = asyncComponent(() =>
    import(`_apps/${route.component}/index.js`).then(module => module.default),
  );

  const { exact, strict } = route;

  return (
    <Route
      exact={exact}
      strict={strict}
      path={route.url}
      render={props => (
        <Component {...props} />
      )}
    />
  );
};

export { asyncComponent, RouteWithSubRoutes };
