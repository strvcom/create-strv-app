'use strict'

const path = require('path')

const ms = require('ms')
const execa = require('execa')
const fs = require('fs-extra')
const { prompt } = require('inquirer')
const validateName = require('validate-npm-package-name')
const chalk = require('chalk')
const ora = require('ora')

const Generator = require('./Generator')
const banner = require('./banner')

const dotfiles = require('./plugins/dotfiles')
const eslint = require('./plugins/eslint')
const prettier = require('./plugins/prettier')
const stylelint = require('./plugins/stylelint')
const gitHooks = require('./plugins/git-hooks')
const commitlint = require('./plugins/commitlint')
const styledComponents = require('./plugins/styled-components')
const redux = require('./plugins/redux')
const typescript = require('./plugins/typescript')
// const firebase = require('./plugins/firebase')
// const heroku = require('./plugins/heroku')
// const cypress = require('./plugins/cypress')

// const isTest = process.env.TEST

const DEFAULT_PLUGINS = [
  {
    name: 'dotfiles',
    apply: dotfiles,
  },
  {
    name: 'ESLint',
    apply: eslint,
  },
  {
    name: 'Prettier',
    apply: prettier,
  },
  {
    name: 'git-hooks',
    apply: gitHooks,
  },
  {
    name: 'stylelint',
    apply: stylelint,
  },
]

let spinner = ora({
  color: 'red',
})

async function create() {
  const start = Date.now()

  banner()

  const { name } = await prompt({
    name: 'name',
    message: 'What is the name of the project?',
    validate: value => {
      const { errors } = validateName(value)
      if (errors) {
        errors.unshift(`Invalid package name: ${value}`)
        return errors
          .map(e => e.charAt(0).toUpperCase() + e.substring(1))
          .join(`\n${chalk.red('>>')} `)
      }

      const targetDir = path.resolve(value)
      if (fs.existsSync(targetDir)) {
        return `Target directory ${chalk.cyan(targetDir)} already exists.`
      }

      return true
    },
  })

  const { type } = await prompt({
    name: 'type',
    type: 'list',
    message: 'What type of application do you need?',
    choices: [
      { name: 'Single-page', value: 'SPA' },
      { name: 'Server-rendered', value: 'SSR' },
      // { name: 'Static', value: 'Static' },
    ],
  })

  const { packageManager } = await prompt({
    name: 'packageManager',
    message: 'What is your preferred package manager?',
    type: 'list',
    choices: [{ name: 'Yarn', value: 'yarn' }, 'npm'],
  })

  const { useTypeScript } = await prompt({
    name: 'useTypeScript',
    type: 'confirm',
    message: 'Do you want to use TypeScript?',
  })

  const { optionalPlugins } = await prompt({
    name: 'optionalPlugins',
    message: 'Add some optional plugins?',
    type: 'checkbox',
    choices: [
      {
        name: 'styled-components',
        value: { name: 'styled-components', apply: styledComponents },
      },
      {
        name: 'redux',
        value: { name: 'redux', apply: redux },
      },
      {
        name: 'commitlint',
        value: { name: 'commitlint', apply: commitlint },
      },
    ],
  })

  const targetDir = path.resolve(name)
  const plugins = optionalPlugins.concat(DEFAULT_PLUGINS)
  if (useTypeScript) {
    plugins.push({ name: 'TypeScript', apply: typescript })
  }

  // run the generator
  spinner.start('Generating project')
  const generator = new Generator({ name, type, plugins, targetDir })
  await generator.generate()
  spinner.succeed(`Project generated at ${chalk.blue(targetDir)}`)

  // install dependencies
  spinner.start(`Installing dependencies with ${chalk.blue(packageManager)}`)
  await execa(packageManager, ['install'], { cwd: targetDir })
  spinner.succeed(`Dependencies installed with ${chalk.blue(packageManager)}`)

  // intialize git
  spinner.start('Initializing git')
  await execa('git', ['init'], { cwd: targetDir })
  await execa('git', ['add', '-A'], { cwd: targetDir })
  await execa('git', ['commit', '-m', 'Initial commit'], {
    cwd: targetDir,
  })
  spinner.succeed(`${chalk.blue('git')} initialized`)

  spinner.succeed(`Project created in ${chalk.blue(ms(Date.now() - start))} 🎉`)

  generator.onComplete()
}

// eslint-disable-next-line
module.exports = (...args) => {
  create().catch(error => {
    spinner.fail(`Error: ${error.message}`)
    // if (process.env.DEBUG) {
    console.log(error)
    // }
  })
}
