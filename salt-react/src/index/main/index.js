import React from 'react';
import { HashRouter as Router, browserHistory } from 'react-router-dom';
import shortid from 'shortid';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

import '_resources/css/common.css';
import '_resources/css/non-responsive.css';
import '_resources/css/theme/cdc-bootstrap-theme.css';
import '_resources/css/theme/cdc-bootstrap-theme-extend.css';

import Layout from '_layouts/cdc';
import { RouteWithSubRoutes } from '_components/router';

/**
 * 엔트리 포인트에서 사용되는 컨테이너
 * 모듈정보와 레이아웃 그리고 메뉴 자주 변하지 않는 데이터를 일괄적으로 로드한다.
 * 변경이 발생할 경우 푸쉬 방식으로 요청을 받아 새로 데이터를 수집한다.
 * redux 는 apps 에서만 사용한다.
 * @param {*} props
 */
class MainIndex extends React.Component {
  constructor(props) {
    super(props);

    this.menus = [
      {
        name: '홈',
        path: '/',
        component: 'dashboard/index.js',
        exact: true,
        strict: false,
        idx: 1,
        parentIdx: 'menu',
      },
      {
        name: '로그인',
        path: '/login',
        component: '/dashboard2/index.js',
        exact: false,
        strict: false,
        idx: 2,
        parentIdx: 'menu',
      },
      {
        name: '데모',
        path: '/demo',
        component: '/demo/index.js',
        exact: false,
        strict: false,
        idx: 3,
        parentIdx: 'menu',
      },
    ];
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Layout menus={this.menus}>
          {this.menus.map((menu) => {
            const { exact, strict, path, component } = menu;
            if (component !== undefined) {
              const menuIdx = shortid.generate();
              return (
                <RouteWithSubRoutes
                  key={menuIdx}
                  exact={exact}
                  strict={strict}
                  path={path}
                  component={component}
                />
              );
            }
            return null;
          })}
        </Layout>
      </Router>
    );
  }
}

export default MainIndex;
