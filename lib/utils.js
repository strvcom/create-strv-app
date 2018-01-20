'use strict'

const execa = require('execa')

const hasYarn = () => {
  try {
    execa.sync('yarnpkg', '--version')
    return true
  } catch (err) {
    return false
  }
}

module.exports = {
  hasYarn,
}
