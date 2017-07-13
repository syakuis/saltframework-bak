import React from 'react';
import { render } from 'react-dom';
import MainContainer from '_containers/main';

class App {
  static main() {
    render(
      <MainContainer />,
      document.getElementById('app'),
    );
  }
}

App.main();
