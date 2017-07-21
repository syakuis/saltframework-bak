import React from 'react';
import Modal from 'react-modal';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { WidthProvider, Responsive } from 'react-grid-layout';
import { connect } from 'react-redux';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { setViewInitialize } from '_actions/view';

import { repoState, repoProps, copyLayoutItem, createPortlet, copyPortlet } from '../repository';

import Navbar from '../components/Navbar';
import LayoutForm from '../components/LayoutForm';
import CreatePortletComponent from '../components/CreatePortletComponent';

const LayoutGrids = WidthProvider(Responsive);

const defaultProps = {
  config: {},
  layout: [],
  layouts: {},
  portlets: {},
  ...repoState,
  isShowLayoutForm: false,
};

class DashboardEditor extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    this.showLayoutForm = this.showLayoutForm.bind(this);

    this.layoutGridItem = this.layoutGridItem.bind(this);
    this.layoutChange = this.layoutChange.bind(this);
    this.setLayoutConfig = this.setLayoutConfig.bind(this);

    this.setPortletOptions = this.setPortletOptions.bind(this);
    this.addPortlet = this.addPortlet.bind(this);
    this.copyPortlet = this.copyPortlet.bind(this);
    this.deletePortlet = this.deletePortlet.bind(this);

    this.state = props;
  }

  setLayoutConfig(config) {
    this.setState({ config });
  }

  /**
   * react-grid-layout 에 추가된 포틀릿의 오션을 제어한다.
   * @param {*} portlet
   */
  setPortletOptions(portlet) {
    const portlets = Object.assign({}, {
      ...this.state.portlets,
      [portlet.config.i]: portlet,
    });

    this.setState({
      portlets,
    });
  }

  /**
   * react-grid-layout 포틀릿을 추가한다.
   * @param {*} componentName
   */
  addPortlet(componentName) {
    const portlet = createPortlet(componentName);

    this.setState({
      portlets: {
        ...this.state.portlets,
        [portlet.config.i]: portlet,
      },
    });
  }

  /**
   * react-grid-layout 포틀릿을 복사해서 추가한다.
   * @param {*} idx
   */
  copyPortlet(idx) {
    const portlet = copyPortlet(Object.assign({}, this.state.portlets[idx]));
    const newIdx = portlet.config.i;

    const layout = copyLayoutItem(this.state.layout, idx, newIdx);
    const layoutsLg = copyLayoutItem(this.state.layouts.lg, idx, newIdx);
    const layoutsMd = copyLayoutItem(this.state.layouts.md, idx, newIdx);
    const layoutsSm = copyLayoutItem(this.state.layouts.sm, idx, newIdx);
    const layoutsXs = copyLayoutItem(this.state.layouts.xs, idx, newIdx);
    const layoutsXxs = copyLayoutItem(this.state.layouts.xxs, idx, newIdx);

    this.setState({
      portlets: {
        ...this.state.portlets,
        [newIdx]: portlet,
      },
      layout,
      layouts: {
        lg: layoutsLg,
        md: layoutsMd,
        sm: layoutsSm,
        xs: layoutsXs,
        xxs: layoutsXxs,
      },
    });
  }

  /**
   * react-grid-layout 포틀릿을 삭제한다.
   * @param {*} idx
   */
  deletePortlet(idx) {
    const portlets = Object.assign({}, this.state.portlets);
    delete portlets[idx];

    this.setState({
      portlets,
    });
  }

  layoutChange(layout, layouts) {
    this.setState({
      layout,
      layouts,
    });
  }

  /**
   * LayoutForm 컴포넌트 모달의 활성화 여부를 제어한다.
   */
  showLayoutForm() {
    this.setState({ isShowLayoutForm: !this.state.isShowLayoutForm });
  }

  layoutGridItem() {
    const { portlets } = this.state;
    return Object.keys(portlets).map((key) => {
      const portlet = portlets[key];
      const { config, component } = portlet;
      return (
        <div
          key={config.i}
          data-grid={config}
        >
          <CreatePortletComponent
            component={component}
            idx={config.i}
            padding={config.padding}
            portlet={portlet}
            setPortletOptions={this.setPortletOptions}
            copyPortlet={this.copyPortlet}
            deletePortlet={this.deletePortlet}
          />
        </div>
      );
    });
  }

  render() {
    const { config, layout, layouts } = this.state;
    return (
      <div className="bs3-theme dashboard">
        <Navbar
          portlets={repoProps.portlets}
          config={config}
          showLayoutForm={this.showLayoutForm}
          addPortlet={this.addPortlet}
        />
        <Modal
          contentLabel="layoutForm"
          isOpen={this.state.isShowLayoutForm}
          onRequestClose={this.showLayoutForm}
          shouldCloseOnOverlayClick
        >
          <LayoutForm
            {...config}
            modalClose={this.showLayoutForm}
            setLayoutConfig={this.setLayoutConfig}
          />
        </Modal>

        <LayoutGrids
          onLayoutChange={this.layoutChange}
          {...repoProps.config}
          {...config}
          layout={layout}
          layouts={layouts}
        >
          {this.layoutGridItem()}
        </LayoutGrids>
      </div>
    );
  }
}

DashboardEditor.defaultProps = defaultProps;

const mapStateToProps = state => ({
  data: state.view,
});

const mapDispatchToProps = dispatch => ({
  setViewInitialize: data => dispatch(setViewInitialize(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardEditor);

