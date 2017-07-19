import React from 'react';
import PropTypes from 'prop-types';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { WidthProvider, Responsive } from 'react-grid-layout';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import CreatePortletComponent from './CreatePortletComponent';

const ReactGridLayout = WidthProvider(Responsive);

const propTypes = {
  config: PropTypes.object.isRequired,
  layout: PropTypes.array.isRequired,
  layouts: PropTypes.object.isRequired,
  portlets: PropTypes.object.isRequired,

  layoutChange: PropTypes.func.isRequired,
};

class GridLayout extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const { layoutChange, config, layout, layouts, portlets } = this.props;
    const PortletComponents = Object.keys(portlets).map((key) => {
      const { layout: layoutConfig, component, ...portlet } = portlets[key];
      return (
        <div key={layoutConfig.i} data-grid={layoutConfig}>
          <CreatePortletComponent
            component={component}
            idx={layoutConfig.i}
            padding={layoutConfig.padding}
            {...portlet}
          />
        </div>
      );
    });
    return (
      <ReactGridLayout
        onLayoutChange={layoutChange}
        {...config}
        layout={layout}
        layouts={layouts}
      >
        {PortletComponents}
      </ReactGridLayout>
    );
  }
}

GridLayout.propTypes = propTypes;

export default GridLayout;
