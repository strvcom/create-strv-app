'use strict'

module.exports = api => {
  api.addDevDependency('@commitlint/cli')
  api.addDevDependency('@commitlint/config-conventional')
  api.updatePackageJson({
    commitlint: {
      extends: ['@commitlint/config-conventional'],
    },
  })
}
