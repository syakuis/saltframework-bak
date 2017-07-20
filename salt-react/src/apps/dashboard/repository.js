import shortid from 'shortid';
import * as portlets from './portlets';

const repoLayout = {
  padding: 0,
  w: 2,
  h: 12,
  x: 0,
  y: null,
  static: false,
  moved: false,
  isDraggable: true,
  isResizable: true,
  i: null,
};

const repoPortlet = {
  config: repoLayout,
  componentName: null,
  component: null,
  options: {},
};

const repoProps = {
  config: {
    className: 'layout',
    autoSize: true,
    draggableHandle: '.draggable-point',
    verticalCompact: true,
    isDraggable: true, // isView 에 의해 제어된다.
    isResizable: true, // isView 에 의해 제어된다.
    useCSSTransforms: true,
    cols: { lg: 12, md: 12, sm: 12, xs: 12, xxs: 2 },
    // cols: 12,
    breakpoints: { lg: 480, md: 480, sm: 480, xs: 480, xxs: 0 },
  },
  portlets,
};

const repoState = {
  config: {
    whiteSpace: [0, 0, 0, 0],
    margin: [5, 5],
    containerPadding: [0, 0],
    rowHeight: 20,
    cols: { lg: 12, md: 12, sm: 12, xs: 12, xxs: 2 },
    breakpoints: { lg: 480, md: 480, sm: 480, xs: 480, xxs: 0 },
  },
  layout: [],
  layouts: {},
  portlets: {},
};

const createPortlet = (componentName) => {
  const portlet = portlets[componentName];
  // config = react-grid-layout , options = portlet value
  const { config, options } = portlet.getDefault();
  return Object.assign({}, repoPortlet, {
    config: {
      ...config,
      i: shortid.generate(),
    },
    componentName,
    component: portlet,
    options,
  });
};
export { repoState, repoProps, repoLayout, repoPortlet };
export { createPortlet };
