'use strict'

const path = require('path')
const chalk = require('chalk')

module.exports = api => {
  api.addDevDependency('typescript')
  api.addDevDependency('@types/node')
  api.addDevDependency('@types/react-dom')

  if (api.is('SPA')) {
    api.addDevDependency('@types/jest')
    api.addDevDependency('@types/react-router-dom')
    api.addDevDependency('@types/webpack-env')
  } else {
    api.addDevDependency('@types/next')
    api.addDependency('@zeit/next-typescript')
    api.onCreateComplete(() => {
      console.log()
      console.log(
        `To Finish ${chalk.blue(
          'TypeScript'
        )} setup you will need to update next.config.js
        https://github.com/zeit/next-plugins/tree/master/packages/next-typescript
        `
      )
    })
  }

  api.updatePackageJson({
    scripts: {
      'type-check': 'tsc',
    },
  })

  if (api.hasPlugin('redux')) {
    api.addDevDependency('@types/react-redux')
  }

  api.copy(path.resolve('./template'))
}
