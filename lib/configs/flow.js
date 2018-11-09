'use strict'

const updatePkg = require('../utils/update-pkg')
const updateBabelRc = require('../utils/update-babelrc')

const pkg = {
  scripts: {
    flow: 'flow',
  },
  devDependencies: {
    'flow-bin': '^0.69.0',
    'babel-preset-flow': '^6.23.0',
  },
}

const babel = {
  presets: ['flow'],
}

module.exports = async path => {
  await updatePkg(path, pkg)
  await updateBabelRc(path, babel)
}
