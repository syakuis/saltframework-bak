const base = require('./webpack.base.config');

module.exports = (env = {
  proxyHost: 'http://portal.aintop.co.kr:8080',
}) => (base(env));
