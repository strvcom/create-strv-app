#!/usr/bin/env node

'use strict'

const { resolve } = require('path')

const fs = require('fs-extra')
const mri = require('mri')
const execa = require('execa')
const ora = require('ora')
const { prompt } = require('inquirer')
const ms = require('ms')
const chalk = require('chalk')
const merge = require('lodash.merge')
const updateNotifier = require('update-notifier')
const validateName = require('validate-npm-package-name')

const log = require('../lib/log')
const createPkg = require('../lib/create-pkg')
const { hasYarn } = require('../lib/utils')
const banner = require('../lib/banner')
const help = require('../lib/help')
// const list = require('../lib/list')

const rootPkg = require('../package.json')

updateNotifier({ pkg: rootPkg }).notify()

if (process.versions.node.split('.')[0] < 8) {
  log.warn(
    'In order to execute code that contains the async or await keywords, you need to have at least version 8.0.0 of Node.js installed'
  )
  process.exit(1)
}

const flags = mri(process.argv.slice(2), {
  alias: {
    h: 'help',
    v: 'version',
    npm: 'npm',
    // l: 'list',
  },
  unknown(flag) {
    log.warn(`The option "${flag}" is unknown. Use one of these:`)
    console.log(help())
    process.exit(1)
  },
})

if (flags.help) {
  console.log(help())
  process.exit()
}

if (flags.version) {
  console.log(`create-strv-app ${chalk.green(rootPkg.version)}`)
  process.exit()
}

// if (flags.list) {
//   console.log(list())
//   process.exit()
// }

const filterNodeModules = name =>
  !name.includes('node_modules') && !name.includes('yarn.lock')

let spinner

const main = async () => {
  const start = Date.now()

  const rootPath = resolve(__dirname, '../templates')
  const appTypes = await fs.readdir(rootPath)

  const { appType } = await prompt({
    type: 'list',
    name: 'appType',
    message: 'Choose an application type:',
    choices: appTypes.filter(
      type => type !== 'dotfiles' && !type.startsWith('.')
    ),
  })

  if (appType === 'Static') {
    log.warn(
      `\nStatic templates are currently not supported directly.\nTo create a static project, choose one from SSR and follow these instructions:\nhttps://github.com/zeit/next.js/#static-html-export`
    )
    process.exit(0)
  }

  const templatesPath = resolve(rootPath, appType)
  const templates = await fs.readdir(templatesPath)

  const { template } = await prompt({
    type: 'list',
    name: 'template',
    message: 'Choose a template:',
    choices: templates.filter(t => !t.startsWith('.')),
  })

  const { projectName } = await prompt({
    name: 'projectName',
    message: 'Enter your project name:',
    validate: input => (input === '' ? 'Cannot be empty.' : true),
  })

  const projectPath = resolve(projectName)

  const { errors } = validateName(projectName)
  if (errors) {
    errors.unshift(`Invalid package name: ${projectName}`)
    log.warn(
      errors
        .map(e => e.charAt(0).toUpperCase() + e.substring(1))
        .join('\n    - ')
    )
    process.exit(1)
  }

  if (fs.existsSync(projectPath)) {
    log.warn('Project directory already exists. Aborting...')
    process.exit(1)
  }

  const defaultPath = resolve(templatesPath, 'default')
  const dotfilesPath = resolve(rootPath, 'dotfiles')

  await fs.copy(defaultPath, projectPath, { filter: filterNodeModules })
  await fs.copy(dotfilesPath, projectPath)

  let pkg = await fs.readJson(resolve(defaultPath, 'package.json'))
  pkg.name = projectName

  if (template !== 'default') {
    const templatePath = resolve(templatesPath, template)
    await fs.copy(templatePath, projectPath, { filter: filterNodeModules })
    const templatePkg = await fs.readJson(resolve(templatePath, 'package.json'))
    pkg = merge(pkg, templatePkg)
  }

  await createPkg({ projectPath, pkg })

  ora('Creating project in').succeed(
    `Project created at ${chalk.blue(projectPath)} 📦`
  )

  spinner = ora({
    text: 'Installing dependencies to get you started.',
  }).start()

  const cmd = hasYarn() && !flags.npm ? 'yarn' : 'npm'
  await execa(cmd, ['install'], { cwd: projectPath })

  spinner.succeed(`Project created for you in ${ms(Date.now() - start)} 🎉`)
}

console.log(banner)

main().catch(err => {
  if (spinner) {
    spinner.fail(err)
  } else {
    log.error(`Failed with following error: ${err}`)
  }
  process.exit(1)
})
