'use strict'

const path = require('path')

module.exports = api => {
  api.copy(path.resolve(__dirname, './template'))
}
