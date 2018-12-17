'use strict'

module.exports = api => {
  api.addDependency('styled-components')
  api.addDevDependency('babel-plugin-styled-components')

  api.updateBabel({
    plugins: api.is('SPA')
      ? ['babel-plugin-styled-components']
      : [['babel-plugin-styled-components', { ssr: true }]],
  })

  api.copy(files => {
    const dest = api.is('SPA') ? 'src/styles/global.js' : 'styles/global.js'
    files[dest] = require.resolve('./templates/global.js')
  })

  if (!api.is('SPA')) {
    api.copy(files => {
      files['pages/_document.js'] = require.resolve('./templates/_document.js')
    })
  }
}
