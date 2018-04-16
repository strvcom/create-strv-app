'use strict'

const { resolve } = require('path')
const { copy } = require('fs-extra')
const merge = require('lodash.merge')

const updatePkg = require('../../utils/update-pkg')
const updateBabelRc = require('../../utils/update-babelrc')
const copyDotfile = require('../../utils/copy-dotfile')

const pkg = {
  dependencies: {
    'styled-components': '^3.0.0',
  },
  devDependencies: {
    stylelint: '^9.2.0',
    'stylelint-config-standard': '^18.2.0',
    'stylelint-config-styled-components': '^0.1.0',
    'stylelint-processor-styled-components': '^1.3.0',
  },
}

const babel = {
  SPA: {
    plugins: ['styled-components'],
  },
  SSR: {
    plugins: [['styled-components', { ssr: true }]],
  },
}

const babelPkg = {
  dependencies: {
    'babel-plugin-styled-components': '^1.1.0',
  },
}

module.exports = async (path, type) => {
  const isWithBabel = type !== 'RN'
  const extendedPkg = isWithBabel ? merge(pkg, babelPkg) : pkg

  await updatePkg(path, extendedPkg)
  if (isWithBabel) await updateBabelRc(path, babel[type])
  await copyDotfile(path, '.stylelintrc')

  if (type === 'SSR') {
    await copy(
      resolve(__dirname, '_document'),
      resolve(path, 'pages', '_document.js')
    )
  }
}
