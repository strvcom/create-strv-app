'use strict'

const path = require('path')
const fs = require('fs-extra')

const appendGitAdd = async projectDir => {
  const pgkFile = path.resolve(projectDir, 'package.json')
  const pkg = await fs.readJson(pgkFile)

  if (pkg['lint-staged']) {
    pkg['lint-staged']['*.js'].push('git add')
    pkg['lint-staged']['*.{json,css,md}'].push('git add')

    return fs.writeJson(pgkFile, pkg, { spaces: '  ' })
  }
}

const afterAll = async projectDir => {
  await appendGitAdd(projectDir)
}

module.exports = afterAll
