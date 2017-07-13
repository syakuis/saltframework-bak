import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  logoImage: PropTypes.string.isRequired,
};

const Footer = props => (
  <footer className="container">
    <div className="row">
      <div className="col-xs-8">
        <div className="row">
          <div className="col-xs-2"><img src={props.logoImage} alt="" /></div>
          <div className="col-xs-10 text-center">
            <address>
              32263 충청남도 홍성군 홍북면 상하천로58 충청남도개발공사 Tel. 041-630-7800 | Fax.041-630-7897
            </address>
          </div>
        </div>
      </div>
      <div className="col-xs-2">
        <select className="form-control input-sm">
          <option>충청남도유관기관</option>
          <option>충청남도유관기관</option>
        </select>
      </div>
      <div className="col-xs-2">
        <select className="form-control input-sm">
          <option>전국도시개발공사</option>
          <option>전국도시개발공사</option>
        </select>
      </div>
    </div>
  </footer>
);

Footer.propTypes = propTypes;

export default Footer;
