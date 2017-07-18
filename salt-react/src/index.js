import React from 'react';
import { render } from 'react-dom';
import MainApp from '_apps/main';

import Modal from 'react-modal';

Modal.defaultStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    zIndex: 19,
  },
  content: {
    position: 'absolute',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '10px',
    outline: 'none',
    padding: '20px',

    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 20,
  },
};

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
