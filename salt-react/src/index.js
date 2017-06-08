import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LayoutContainer from 'CONTAINERS/layout';
import MainContainer from 'CONTAINERS/main';

class App {
  static main() {
    render(
      <Router>
        <LayoutContainer>
          <Route path="/" exact component={MainContainer} />
        </LayoutContainer>
      </Router>,
      document.getElementById('app'),
    );
  }
}

App.main();
