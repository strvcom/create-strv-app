'use strict'

const path = require('path')

const fs = require('fs-extra')

const sortObject = require('./utils/sort-object')
const readmes = require('./readmes')
const PluginAPI = require('./PluginAPI')

class Generator {
  constructor({ name, type, plugins, targetDir }) {
    this.name = name
    this.type = type
    this.plugins = plugins
    this.targetDir = targetDir

    this.pkg = {
      name,
      version: '0.1.0',
      private: true,
      author: '',
      scripts: {},
      devDependencies: {},
      dependencies: {},
    }
    this.babel = null
    this.copyFiles = {}
    this.writeFiles = {}
    this.completeCbs = []
  }

  sortPackageJson() {
    this.pkg.dependencies = sortObject(this.pkg.dependencies)
    this.pkg.devDependencies = sortObject(this.pkg.devDependencies)
    this.pkg.scripts = sortObject(this.pkg.scripts, [
      'start',
      'dev',
      'build',
      'test',
      'e2e',
      'lint',
      'deploy',
    ])
    this.pkg = sortObject(this.pkg, [
      'name',
      'version',
      'private',
      'description',
      'author',
      'scripts',
      'dependencies',
      'devDependencies',
      'babel',
      'lint-staged',
      'husky',
      'prettier',
      'eslintConfig',
      'stylelint',
      'browserslist',
      'jest',
    ])
  }

  copyFileTree() {
    return Promise.all(
      Object.keys(this.copyFiles).map(async name => {
        const filePath = path.join(this.targetDir, name)
        await fs.ensureDir(path.dirname(filePath))
        await fs.copy(this.copyFiles[name], filePath)
      })
    )
  }

  writeFileTree() {
    return Promise.all(
      Object.keys(this.writeFiles).map(async name => {
        const filePath = path.join(this.targetDir, name)
        await fs.ensureDir(path.dirname(filePath))
        await fs.writeFile(filePath, this.writeFiles[name])
      })
    )
  }

  renderReadme(templateDir) {
    const PLACEHOLDERS = [{ re: '<PROJECT_NAME>', value: this.name }]

    const filtered = readmes.filter(readme => {
      if (!readme.plugin) {
        return true
      }

      return Object.keys(this.plugins).includes(readme.plugin)
    })

    // add readme from template at the beginning
    filtered.unshift({ file: path.resolve(templateDir, 'readme.md') })

    const result = filtered.reduce((acc, { file }) => {
      let content = fs.readFileSync(file, 'utf8')
      PLACEHOLDERS.forEach(p => {
        const re = new RegExp(p.re, 'ug')
        content = content.replace(re, p.value)
      })
      acc = acc.concat(content, '\n')
      return acc
    }, '')

    const filePath = path.resolve(this.targetDir, 'readme.md')
    return fs.writeFile(filePath, result, 'utf8')
  }

  onComplete() {
    this.completeCbs.forEach(cb => cb())
  }

  async generate() {
    const templateDir = path.resolve(__dirname, '../templates', this.type)

    const templatePkgJson = fs.readJsonSync(
      path.resolve(templateDir, 'package.json')
    )

    this.pkg = {
      ...this.pkg,
      ...templatePkgJson,
    }

    const api = new PluginAPI(this)
    api.copy(templateDir)

    this.plugins.forEach(plugin => plugin.apply(api))

    this.sortPackageJson()

    this.writeFiles['package.json'] = JSON.stringify(this.pkg, null, 2) + '\n'
    if (this.babel) {
      this.writeFiles['.babelrc'] = JSON.stringify(this.babel, null, 2) + '\n'
    }

    // we provide our own
    delete this.copyFiles['package.json']
    delete this.copyFiles['readme.md']

    await this.copyFileTree()
    await this.writeFileTree()
    await this.renderReadme(templateDir)
  }
}

module.exports = Generator
