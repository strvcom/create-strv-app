'use strict'

module.exports = api => {
  api.addDevDependency('stylelint')
  api.addDevDependency('stylelint-config-standard')

  if (api.hasPlugin('styled-components')) {
    api.addDevDependency('stylelint-processor-styled-components')
    api.addDevDependency('stylelint-config-styled-components')
    api.updatePackageJson({
      stylelint: {
        processors: ['stylelint-processor-styled-components'],
        extends: [
          'stylelint-config-standard',
          'stylelint-config-styled-components',
        ],
        rules: {},
      },
    })
  } else {
    api.updatePackageJson({
      stylelint: {
        extends: 'stylelint-config-standard',
        rules: {},
      },
    })
  }
}
