import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { WidthProvider, Responsive } from 'react-grid-layout';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ReactGridLayout = WidthProvider(Responsive);

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <ReactGridLayout className="layout">
        <div key="1" data-grid={{ w: 2, h: 3, x: 0, y: 0 }}><span className="text">1</span></div>
        <div key="2" data-grid={{ w: 2, h: 3, x: 2, y: 0 }}><span className="text">2</span></div>
        <div key="3" data-grid={{ w: 2, h: 3, x: 4, y: 0 }}><span className="text">3</span></div>
        <div key="4" data-grid={{ w: 2, h: 3, x: 6, y: 0 }}><span className="text">4</span></div>
        <div key="5" data-grid={{ w: 2, h: 3, x: 8, y: 0 }}><span className="text">5</span></div>
      </ReactGridLayout>
    );
  }
}

export default DashboardContainer;
