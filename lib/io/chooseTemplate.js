'use strict'

const path = require('path')
const fs = require('fs-extra')
const { prompt } = require('inquirer')

const sources = require('../../sources/index')

const chooseTemplate = async () => {
  // so far we have only one base
  const base = sources.templates.base

  const coreTemplates = await fs.readdir(sources.templates.core)
  const sugarTemplates = await fs.readdir(sources.templates.sugar)

  const { core, sugars } = await prompt([
    {
      type: 'list',
      name: 'core',
      message: 'Choose an application core:',
      choices: coreTemplates,
    },
    {
      type: 'checkbox',
      name: 'sugars',
      message: 'Choose sugar based on your needs:',
      choices: sugarTemplates,
    },
  ])

  return {
    base,
    core: path.resolve(sources.templates.core, core),
    sugars: sugars.map(sugar => path.resolve(sources.templates.sugar, sugar)),
  }
}

module.exports = chooseTemplate
