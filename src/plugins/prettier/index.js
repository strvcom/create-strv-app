'use strict'

module.exports = api => {
  api.addDevDependency('prettier')

  const ext = api.hasPlugin('TypeScript') ? 'ts,tsx' : 'js'

  api.updatePackageJson({
    scripts: {
      format: `prettier --write '*/**/*.{${ext},css,md,json}'`,
    },
    prettier: {
      semi: false,
      singleQuote: true,
      trailingComma: 'es5',
    },
  })

  api.render(files => {
    files['.prettierignore'] = 'package.json'
    if (!api.is('SPA')) {
      files['.prettierignore'] += '\n.next'
    }
  })
}
