'use strict'

module.exports = api => {
  api.addDevDependency('cypress')
  api.addDevDependency('eslint-plugin-cypress')
  api.updatePackageJson({
    scripts: {
      'test:e2e': 'cypress run',
      'cypress:open': 'cypress open',
    },
  })
  api.copy(require.resolve('./templates'))
}
