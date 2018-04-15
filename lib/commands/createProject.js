'use strict'

const execa = require('execa')
const ora = require('ora')
const chalk = require('chalk')
const initProject = require('../io/initProject')
const chooseTemplate = require('../io/chooseTemplate')
const mergeTemplate = require('../io/merge/mergeTemplate')
const sources = require('../../sources/index')

const createProject = async () => {
  const projectDir = await initProject()
  const { base, core, sugars } = await chooseTemplate()
  const spinner = ora()

  await mergeTemplate(base, projectDir, spinner)
  await mergeTemplate(core, projectDir, spinner)

  for (let sugar of sugars) {
    await mergeTemplate(sugar, projectDir, spinner, core)
  }

  await sources.scripts.afterAll(projectDir)

  spinner.succeed(`Project created at ${chalk.blue(projectDir)} 📦`)

  spinner.start('Installing dependencies to get you started...')
  await execa('npm', ['install'], { cwd: projectDir })

  spinner.succeed(`All done 🎉`)
}

module.exports = createProject
