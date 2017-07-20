import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  portlets: PropTypes.object.isRequired,
  showLayoutForm: PropTypes.func.isRequired,
  addPortlet: PropTypes.func.isRequired,
};

class Navbar extends React.Component {

  constructor(props) {
    super(props);

    this.showPortletList = this.showPortletList.bind(this);
    this.addPortlet = this.addPortlet.bind(this);

    this.state = {
      isShowPortletList: false,
      portlets: this.getPortlets(),
    };
  }

  getPortlets() {
    return Object.keys(this.props.portlets).reduce((result, key) => {
      const portlet = this.props.portlets[key];
      const { config, options, ...info } = portlet.getDefault();

      return {
        ...result,
        [key]: {
          info,
          config,
          options,
          portlet,
        },
      };
    }, {});
  }

  showPortletList() {
    this.setState({ isShowPortletList: !this.state.isShowPortletList });
  }

  addPortlet(portletName) {
    this.showPortletList();
    this.props.addPortlet(portletName);
  }

  render() {
    const showPortletListStyle = { width: '100%', position: 'absolute', marginTop: 5 };
    if (!this.state.isShowPortletList) {
      showPortletListStyle.display = 'none';
    }

    const portletComponents = Object.keys(this.state.portlets).map(
      (portletName) => {
        const portlet = this.state.portlets[portletName];
        return (
          <li key={portletName}>
            <div
              className="thumbnail"
              role="button"
              tabIndex={0}
              onClick={() => this.addPortlet(portletName)}
            >
              {portlet.info.images === '' || !portlet.info.image ? 'Screenshot' : <img src={portlet.info.image} alt="" />}
              <div className="caption">
                <h3>{portlet.info.title}</h3>
              </div>
            </div>
          </li>
        );
      },
    );

    return (
      <div>
        <div className="revise-area">
          <nav className="navbar navbar-default">
            <div id="navbar" className="navbar-collapse collapse">
              <div
                className="btn btn-default"
                role="button"
                tabIndex={0}
                onClick={this.showPortletList}
              >
                <span className="fa fa-plus" aria-hidden="true" />
              </div>
              <span className="title">포틀릿 추가</span>
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <div
                    role="button"
                    tabIndex={0}
                    className="btn btn-danger plus-btn"
                    onClick={this.props.showLayoutForm}
                  >
                    <i className="fa fa-cog" /> 설정
                  </div>
                </li>
                <li>
                  <div
                    role="button"
                    tabIndex={0}
                    className="btn btn-success plus-btn"
                  >
                    <i className="fa fa-check" /> 저장
                  </div>
                </li>
                <li>
                  <div
                    role="button"
                    tabIndex={0}
                    className="btn btn-success plus-btn"
                  >
                    <i className="fa fa-times" /> 닫기
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="portlet-plus-list pot-box" style={showPortletListStyle}>
          <div className="port-area clearfix">
            <div className="list-all-view pull-right">
              <div className="btn-group btn-group-sm pull-right">
                <a href="" className="btn btn-default"><i className="fa fa-list-ul" /></a>
                <a href="" className="btn btn-default active"><i className="fa fa-th" /></a>
              </div>
            </div>

            <div className="arrow-btn left" role="button" aria-labelledby="prev" />

            <div className="plus-list">
              <ul className="list-inline">
                {portletComponents}
              </ul>
            </div>
            <div className="arrow-btn right" role="button" aria-labelledby="next" />
          </div>

          <div className="list-all-view-btn" role="button" aria-labelledby="포틀릿 리스트 모두 보이기">
            <i className="fa fa-chevron-down" aria-hidden="true" />
          </div>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = propTypes;

export default Navbar;
