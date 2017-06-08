const base = require('./webpack.base.config')

module.exports = (env) => {
  return base({
    publicPath: './'
  })
}
