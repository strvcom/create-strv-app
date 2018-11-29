'use strict'

const path = require('path')

const globby = require('globby')

const merge = require('./utils/merge')
const { devDependencies } = require('../package.json')

const isString = val => typeof val === 'string'

class PluginAPI {
  constructor(generator) {
    this.generator = generator
  }

  is(type) {
    return this.generator.type === type
  }

  hasPlugin(id) {
    return this.generator.plugins.some(plugin => plugin.name === id)
  }

  updatePackageJson(fields) {
    this.generator.pkg = merge(this.generator.pkg, fields)
  }

  updateBabel(fields) {
    if (this.generator.babel === null) {
      this.generator.babel = {
        presets: this.is('SPA')
          ? ['@strv/react-scripts/babel']
          : ['next/babel'],
      }
    }

    this.generator.babel = merge(this.generator.babel, fields)
  }

  addDependency(name) {
    const dep = devDependencies[name]
    if (dep) {
      this.updatePackageJson({ dependencies: { [name]: dep } })
    } else {
      console.log(
        `Please add ${dep} to create-strv-app package.json devDependencies.`
      )
    }
  }

  addDevDependency(name) {
    const dep = devDependencies[name]
    if (dep) {
      this.updatePackageJson({ devDependencies: { [name]: dep } })
    } else {
      console.log(
        `Please add ${dep} to create-strv-app package.json devDependencies.`
      )
    }
  }

  onCreateComplete(cb) {
    this.generator.completeCbs.push(cb)
  }

  copy(source) {
    if (isString(source)) {
      const sourceFiles = globby.sync(['**/*'], { cwd: source })

      for (const file of sourceFiles) {
        let filename = path.basename(file)

        // dotfiles are ignored on npm, they should be prefixed with underscore
        // we convert them back to dotfiles during generating
        if (filename.charAt(0) === '_') {
          filename = `.${filename.slice(1)}`
        }

        const targetPath = path.join(path.dirname(file), filename)
        const sourcePath = path.resolve(source, file)

        this.generator.copyFiles[targetPath] = sourcePath
      }
    } else {
      source(this.generator.copyFiles)
    }
  }

  render(source) {
    source(this.generator.writeFiles)
  }
}

module.exports = PluginAPI
