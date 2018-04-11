'use strict'

const defaultConfig = require('./default')
const styledComponents = require('./styled-components')
const flow = require('./flow')
const heroku = require('./heroku')
const firebase = require('./firebase')

module.exports = {
  default: defaultConfig,
  styledComponents,
  flow,
  heroku,
  firebase,
}
