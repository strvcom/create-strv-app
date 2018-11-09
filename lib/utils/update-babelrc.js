'use strict'

const { join } = require('path')

const { readJson, writeJson } = require('fs-extra')

const merge = require('./merge')

module.exports = async (path, data) => {
  path = join(path, '.babelrc')

  let pkg = await readJson(path)
  pkg = merge(pkg, data)

  return writeJson(path, pkg, { spaces: '  ' })
}
