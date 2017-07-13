import React from 'react';
import { render } from 'react-dom';
import MainContainer from '_containers/main';

/**
 * 엔트리 포인트
 * @class App
 */
class App {
  static main() {
    render(
      <MainContainer />,
      document.getElementById('app'),
    );
  }
}

App.main();
