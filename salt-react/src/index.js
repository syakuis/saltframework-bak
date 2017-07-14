import React from 'react';
import { render } from 'react-dom';
import MainApp from '_apps/main';

/**
 * 엔트리 포인트
 * @class App
 */
class App {
  static main() {
    render(
      <MainApp />,
      document.getElementById('app'),
    );
  }
}

App.main();
