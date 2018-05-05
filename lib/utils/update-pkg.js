'use strict'

const { join } = require('path')

const { readJson, writeJson } = require('fs-extra')
const sortKeys = require('sort-keys')

const merge = require('./merge')

const dependencyKeys = new Set([
  'dependencies',
  'devDependencies',
  'optionalDependencies',
  'peerDependencies',
])

function normalize(pkg) {
  return Object.keys(pkg).reduce((acc, key) => {
    if (!dependencyKeys.has(key)) {
      acc[key] = pkg[key]
    } else if (Object.keys(pkg[key]).length !== 0) {
      acc[key] = sortKeys(pkg[key])
    }
    return acc
  }, {})
}

module.exports = async (path, data) => {
  path = join(path, 'package.json')

  let pkg = await readJson(path)

  pkg = merge(pkg, data)
  pkg = normalize(pkg)

  return writeJson(path, pkg, { spaces: '  ' })
}
