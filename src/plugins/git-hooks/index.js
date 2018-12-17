'use strict'

module.exports = api => {
  api.addDevDependency('husky')
  api.addDevDependency('lint-staged')

  const hasTS = api.hasPlugin('TypeScript')
  const hasSC = api.hasPlugin('styled-components')

  api.updatePackageJson({
    'lint-staged': {
      '*.js': [
        'eslint --fix',
        ...(hasSC ? ['stylelint'] : []),
        'prettier --write',
        'git add',
      ],
      ...(hasTS && {
        '*.{ts,tsx}': [
          ...(hasSC ? ['stylelint'] : []),
          'prettier --write',
          'git add',
        ],
      }),
      '*.{json,md}': ['prettier --write', 'git add'],
      '*.css': ['stylelint', 'prettier --write', 'git add'],
    },
    husky: {
      hooks: {
        'pre-commit': 'lint-staged',
      },
    },
  })
}
