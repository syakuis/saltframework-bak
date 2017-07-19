import React from 'react';
import Modal from 'react-modal';

import { repoState, repoProps, createPortlet } from '../repository';

import Navbar from '../components/Navbar';
import LayoutForm from '../components/LayoutForm';
import GridLayout from '../components/GridLayout';

const defaultProps = {
  config: {},
  layout: [],
  layouts: {},
  portlets: {},
  ...repoState,
};

class DashboardEditor extends React.Component {
  constructor(props) {
    super(props);
    this.showLayoutForm = this.showLayoutForm.bind(this);

    this.layoutChange = this.layoutChange.bind(this);
    this.setLayoutConfig = this.setLayoutConfig.bind(this);
    this.addPortlet = this.addPortlet.bind(this);

    this.state = {
      ...props,
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
    const { config, portlets, layout, layouts } = this.state;
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
        <GridLayout
          {...repoProps.config}
          config={config}
          layout={layout}
          layouts={layouts}
          portlets={portlets}
          layoutChange={this.layoutChange}
        />
      </div>
    );
  }
}

DashboardEditor.defaultProps = defaultProps;

export default DashboardEditor;
