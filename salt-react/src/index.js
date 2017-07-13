import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '_reducers';
import MainContainer from '_containers/main';

const store = createStore(reducers);

class App {
  static main() {
    render(
      <Provider store={store}>
        <MainContainer />
      </Provider>,
      document.getElementById('app'),
    );
  }
}

App.main();
