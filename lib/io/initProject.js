'use strict'

const fs = require('fs-extra')
const path = require('path')
const { prompt } = require('inquirer')
const log = require('../utils/log')

const initProject = async () => {
  const cwdDir = process.cwd()

  const { projectName } = await prompt({
    type: 'input',
    name: 'projectName',
    message: 'Application name',
    validate(value) {
      return value.trim().length > 0
    },
  })

  const projectDir = path.resolve(cwdDir, projectName)
  const projectDirExists = await fs.pathExists(projectDir)

  if (projectDirExists) {
    const dirFiles = await fs.readdir(projectDir)

    if (dirFiles.length > 0) {
      log.error(`Directory ./${projectName} is not empty`)
      log.info(
        `Use create-react-app --add for adding sugar to your existing project`
      )
      process.exit(1)
    }
  } else {
    fs.mkdir(projectDir)
  }

  return projectDir
}

module.exports = initProject
