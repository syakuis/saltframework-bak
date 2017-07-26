import shortid from 'shortid';

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
  // react-grid-layou portlet config
  config: repoLayout,
  componentName: null,
  component: null,
  // portlet data
  data: {},
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

const copyLayoutItem = (data, index, newIndex) => {
  if (!Array.isArray(data)) return [];
  const item = data.find(object => object.i === index);
  if (item !== undefined) {
    return data.concat(Object.assign({}, item, { i: newIndex }));
  }
  return data;
};

/**
 * 새로운 포틀릿을 데이터를 생성한다.
 * @param {*} componentName portlets/index.js 의 대상 컴포넌트 명
 */
const createPortlet = (portlet) => {
  // config = react-grid-layout , options = portlet value
  const { config, data } = portlet.getDefault();
  return Object.assign({}, repoPortlet, {
    config: {
      ...repoLayout,
      ...config,
      i: shortid.generate(),
    },
    componentName: null,
    data,
  });
};

/**
 * 등록된 포틀릿을 복사해서 새로 만든다.
 * @param {*} portlet
 */
const copyPortlet = portlet => Object.assign({}, portlet, {
  config: {
    ...portlet.config,
    i: shortid.generate(),
  },
});

export { repoState, repoProps, repoLayout, repoPortlet };
export { copyLayoutItem, createPortlet, copyPortlet };
