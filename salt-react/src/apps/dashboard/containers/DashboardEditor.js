import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { WidthProvider, Responsive } from 'react-grid-layout';
import Modal from 'react-modal';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { defaultState, defaultProps, createPortlet } from '../repository';

import Navbar from '../components/Navbar';
import LayoutForm from '../components/LayoutForm';
import CreatePortletComponent from '../components/CreatePortletComponent';

const ReactGridLayout = WidthProvider(Responsive);

class DashboardEditor extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.showLayoutForm = this.showLayoutForm.bind(this);

    this.layoutChange = this.layoutChange.bind(this);
    this.setLayoutConfig = this.setLayoutConfig.bind(this);
    this.addPortlet = this.addPortlet.bind(this);

    this.state = {
      ...defaultState,
      isShowLayoutForm: false,
    };
  }

  setLayoutConfig(config) {
    this.setState({ config });
  }

  addPortlet(componentName) {
    const portlet = createPortlet(componentName);

    this.setState({
      portlets: {
        ...this.state.portlets,
        [portlet.layout.i]: portlet,
      },
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

  render() {
    const { config, portlets, ...other } = this.state;

    const PortletComponents = Object.keys(portlets).map((key) => {
      const { layout, component, ...portlet } = portlets[key];
      return (
        <div key={layout.i} data-grid={layout}>
          <CreatePortletComponent
            component={component}
            idx={layout.i}
            padding={layout.padding}
            {...portlet}
          />
        </div>
      );
    });

    return (
      <div className="bs3-theme dashboard">
        <Navbar
          portlets={defaultProps.portlets}
          config={this.state.config}
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
            {...this.state.config}
            modalClose={this.showLayoutForm}
            setLayoutConfig={this.setLayoutConfig}
          />
        </Modal>
        <ReactGridLayout
          onLayoutChange={this.layoutChange}
          {...defaultProps.config}
          {...config}
          {...other}
        >
          {PortletComponents}
        </ReactGridLayout>
      </div>
    );
  }
}

export default DashboardEditor;
