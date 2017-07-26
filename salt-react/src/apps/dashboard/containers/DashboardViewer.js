import React from 'react';
import { Link } from 'react-router-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { WidthProvider, Responsive } from 'react-grid-layout';
import { connect } from 'react-redux';
import store from 'store';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { setViewInitialize } from '_actions/view';

import { repoState, repoProps } from '../repository';
import ViewPortletComponent from '../components/ViewPortletComponent';

const LayoutGrids = WidthProvider(Responsive);

const defaultProps = {
  config: {},
  layout: [],
  layouts: {},
  portlets: {},
  ...repoState,
  isShowLayoutForm: false,
};

class DashboardViewer extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    this.layoutGridItem = this.layoutGridItem.bind(this);
    this.state = props;
  }

  componentWillMount() {
    // 백엔드에 저장할 수 없어 임시로 로컬 저장소를 사용한다.
    const data = store.get('dashobard');
    this.setState({
      ...this.state,
      ...data,
    });
  }

  layoutGridItem() {
    const { portlets } = this.state;
    return Object.keys(portlets).map((key) => {
      const portlet = portlets[key];
      const { config } = portlet;
      return (
        <div
          key={config.i}
          data-grid={config}
        >
          <ViewPortletComponent
            idx={config.i}
            padding={config.padding}
            portlet={portlet}
          />
        </div>
      );
    });
  }

  render() {
    const { config, layout, layouts } = this.state;
    return (
      <div className="bs3-theme dashboard">
        <LayoutGrids
          {...repoProps.config}
          {...config}
          layout={layout}
          layouts={layouts}
          isDraggable={false}
          isResizable={false}
        >
          {this.layoutGridItem()}
        </LayoutGrids>
        <Link to="/editor">수정</Link>
      </div>
    );
  }
}

DashboardViewer.defaultProps = defaultProps;

const mapStateToProps = state => ({
  data: state.view,
});

const mapDispatchToProps = dispatch => ({
  setViewInitialize: data => dispatch(setViewInitialize(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardViewer);

