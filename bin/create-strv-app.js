#!/usr/bin/env node
'use strict'

const args = require('args')
const path = require('path')
const fs = require('fs-extra')
const execa = require('execa')
const ora = require('ora')
const { prompt } = require('inquirer')
const ms = require('ms')
const chalk = require('chalk')
const updateNotifier = require('update-notifier')
const pkgJson = require('../lib/pkg-json')
const log = require('../lib/log')
const { hasYarn } = require('../lib/utils')
const pkg = require('../package.json')

updateNotifier({ pkg }).notify()

args
  .option('npm', 'Use npm to install dependencies', false)
  .example(
    'create-strv-app default my-awesome-app',
    'Create app based on default template'
  )
  .example('create-strv-app list', 'List all available templates')

const flags = args.parse(process.argv, {
  name: 'create-strv-app',
  value: '<template> <name>',
})

const main = async () => {
  const start = Date.now()
  let template = args.sub[0] && args.sub[0].toLowerCase()
  let projectName = args.sub[1]

  const templatesPath = path.resolve(__dirname, '../templates')
  const dir = await fs.readdir(templatesPath)
  const templates = dir.filter(tmp => tmp !== 'dotfiles')

  if (!template) {
    const res = await prompt({
      type: 'list',
      name: 'template',
      message: 'Choose a template:',
      choices: templates,
    })

    template = res.template
  }

  if (!templates.includes(template)) {
    log.warn("Template doesn't exist.")
    return
  }

  if (!projectName) {
    const res = await prompt({
      name: 'projectName',
      message: 'Enter you project name',
    })

    projectName = res.projectName
  }

  const templatePath = path.resolve(templatesPath, template)
  const dotfilesPath = path.resolve(__dirname, '../templates/dotfiles')
  const projectPath = path.resolve(process.cwd(), projectName)

  if (fs.existsSync(projectPath)) {
    log.warn('Project directory already exists.')
    return
  }

  let spinner = ora('Creating project in').start()

  await fs.copy(templatePath, projectPath)
  await fs.copy(dotfilesPath, projectPath)
  await pkgJson({ projectPath, projectName })

  spinner.succeed(`Project created at ${chalk.blue(projectPath)}`)

  spinner = ora({
    text: 'Installing dependencies, it can take a while.',
    spinner: 'earth',
  }).start()

  const cmd = hasYarn() && !flags.npm ? 'yarn' : 'npm'
  await execa(cmd, ['install'], { cwd: projectPath })

  spinner.succeed(`Done in ${ms(Date.now() - start)}`)
}

main().catch(err => log.warn(err))
