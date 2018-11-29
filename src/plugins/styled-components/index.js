'use strict'

module.exports = api => {
  api.addDependency('styled-components')
  api.addDevDependency('babel-plugin-styled-components')

  api.updateBabel({
    plugins: api.is('SPA')
      ? ['babel-plugin-styled-components']
      : [['babel-plugin-styled-components', { ssr: true }]],
  })

  if (!api.is('SPA')) {
    api.copy(files => {
      files['pages/_document.js'] = require.resolve('./templates/_document.js')
    })
  }
}
