'use strict'

const path = require('path')

const getPath = name => path.resolve(__dirname, name)

// order matters here
module.exports = [
  { file: getPath('./default.md') },
  {
    plugin: 'styled-components',
    file: getPath('./styled-components.md'),
  },
]
