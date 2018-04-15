'use strict'

const path = require('path')
const afterAll = require('./scripts/afterAll')

const templates = {
  base: path.resolve(__dirname, 'templates', 'base'),
  core: path.resolve(__dirname, 'templates', 'core'),
  sugar: path.resolve(__dirname, 'templates', 'sugar'),
}

const scripts = {
  afterAll,
}

module.exports = {
  templates,
  scripts,
}
