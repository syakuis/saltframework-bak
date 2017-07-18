import React from 'react';
// import PropTypes from 'prop-types';

// const propTypes = {
//   logoImage: PropTypes.string.isRequired,
// };

const Footer = () => (
  <footer className="container">
    <div className="row">
      <div className="col-xs-8">
        <div className="row">
          <div className="col-xs-2">Syaku</div>
          <div className="col-xs-10 text-center">
            <address>
              -
            </address>
          </div>
        </div>
      </div>
      <div className="col-xs-2">
        <select className="form-control input-sm">
          <option>-</option>
          <option>-</option>
        </select>
      </div>
      <div className="col-xs-2">
        <select className="form-control input-sm">
          <option>-</option>
          <option>-</option>
        </select>
      </div>
    </div>
  </footer>
);

// Footer.propTypes = propTypes;

export default Footer;
