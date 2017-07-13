import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  logoImage: PropTypes.string.isRequired,
};

const Header = props => (
  <header>
    <div className="container">
      <div className="row header">
        <div className="col-xs-3 text-center margin-top50">
          <a href="page.main.html"><img alt="" src={props.logoImage} /></a>
        </div>

        <div className="col-xs-4 margin-top50">
          <div className="input-group">
            <input type="text" className="form-control form-search" placeholder="통합검색" />

            <span className="input-group-btn"> <a href="search.html" className="btn btn-default btn-search" target="blank"> <i className="fa fa-search" /> </a> </span>
          </div>

        </div>

        <div className="col-xs-2 margin-top50">
          <div className="input-group">
            <input type="text" className="form-control form-search" placeholder="직원검색" />

            <span className="input-group-btn"><button className="btn btn-default btn-search" type="button"><i className="fa fa-user" /></button></span>
          </div>
        </div>

        <div className="col-xs-3">
          <div className="log-bar">
            <span className="log-font"><i className="fa fa-user" style={{ color: '#3386c6' }} /> <b>유아인</b>&nbsp;|&nbsp;2015.11.23&nbsp;10:00:00</span>
          </div>

          <ul className="margin-top20 icon-none">
            <li>
              <i className="fa fa-home fa-pull-left hvr-wobble-horizontal" data-tooltip-text="홈페이지" />
            </li>
            <li>
              <i className="fa fa-cog fa-pull-left hvr-wobble-horizontal" data-tooltip-text="개인설정" />
            </li>
            <li>
              <a href="member.login.html"><i className="fa fa-sign-in fa-pull-left hvr-wobble-horizontal" data-tooltip-text="로그아웃" /></a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <nav className="navbar navbar-fixed-top navbar-inverse">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#navbar"
            aria-expanded="false"
            aria-controls="navbar"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>

        </div>
        <div id="navbar" className="collapse navbar-collapse">
          <ul className="nav navbar-nav blog-nav">
            <li className="active">
              <a href=""><i className="fa fa-tachometer" /></a>
            </li>
            <li>
              <a href="#about">웹메일</a>
            </li>
            <li>
              <a href="#contact">내부메일</a>
            </li>
            <li>
              <a href="#contact">결재</a>
            </li>
            <li>
              <a href="#contact">문서함</a>
            </li>
            <li>
              <a href="board.list.html">게시판</a>
            </li>
            <li>
              <a href="#contact">동호회</a>
            </li>
            <li>
              <a href="organization.list.html">조직도</a>
            </li>
            <li>
              <a href="#contact">MIS</a>
            </li>
            <li className="dropdown">
              <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">PMS <span className="caret" /></a>
              <ul className="dropdown-menu">
                <li>
                  <a href="">건설관리</a>
                </li>
                <li>
                  <a href="">분양관리</a>
                </li>
                <li>
                  <a href="">보상관리</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#contact">EIS</a>
            </li>
            <li>
              <a href="#contact">EDMS</a>
            </li>
            <li>
              <a href="#contact">관리자</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
);

Header.propTypes = propTypes;

export default Header;
