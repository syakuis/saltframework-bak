import React from 'react';
import { Route } from 'react-router-dom';

/**
 * 대상 컴포넌트를 로드한다.
 * @param {*} getComponent 컴포넌트
 */
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

/**
 * 대상을 동적 임포트하여 라우터에 반영한다.
 * @param {*} route 라우터 정보
 */
const RouteWithSubRoutes = (route) => {
  const Component = asyncComponent(() =>
    import(`_apps/${route.component}/index.js`).then(module => module.default),
  );

  const { exact, strict, common } = route;

  return (
    <Route
      exact={exact}
      strict={strict}
      path={route.url}
      render={props => (
        <Component {...props} common={common} />
      )}
    />
  );
};

export { asyncComponent, RouteWithSubRoutes };
