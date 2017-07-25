import React from 'react';
import { render } from 'react-dom';
import Index from '_index/main';

/**
 * 엔트리 포인트
 * @class App
 */
class App {
  static main() {
    render(
      <Index />,
      document.getElementById('app'),
    );
  }
}

App.main();
