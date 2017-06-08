import React from 'react';
import { render } from 'react-dom';

class App {

  static main() {
    render(
      <div>
        리액트를 시작합니다.
      </div>,
      document.getElementById('app'),
    );
  }
}

App.main();
