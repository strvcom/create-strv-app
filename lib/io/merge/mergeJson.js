'use strict'

const fs = require('fs-extra')
const merge = require('lodash.merge')

const mergeJson = async (source, destination) => {
  const sourceJson = await fs.readJson(source)
  const destinationJson = await fs.readJson(destination).catch(err => {
    if (err.code === 'ENOENT') {
      return {}
    }
    throw err
  })

  const output = merge(destinationJson, sourceJson)

  return fs.writeJson(destination, output, { spaces: '  ' })
}

module.exports = mergeJson
