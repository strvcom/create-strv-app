'use strict'

const { resolve } = require('path')
const { copy } = require('fs-extra')

module.exports = async (path, filename) => {
  const dotfile = resolve(__dirname, '../dotfiles', filename)
  const projectPath = resolve(path, filename)
  await copy(dotfile, projectPath)
}
