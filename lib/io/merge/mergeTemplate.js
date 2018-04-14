'use strict'

const path = require('path')
const klaw = require('klaw')
const mergeFile = require('./mergeFile')

const readFilenames = dir => {
  const items = []

  return new Promise((resolve, reject) => {
    klaw(dir)
      .on('data', async file => {
        if (file.stats.isFile()) {
          items.push(file)
        }
      })
      .on('end', () => resolve(items))
      .on('error', reject)
  })
}

const mergeTemplate = async (templateDir, projectDir, spinner, core) => {
  spinner.start(`Merging template ${path.basename(templateDir)}`)

  const files = await readFilenames(templateDir)

  for (const file of files) {
    const relativeTemplatePath = path.relative(templateDir, file.path)
    const destinationPath = path.resolve(projectDir, relativeTemplatePath)

    await mergeFile(file.path, destinationPath, core)
  }
}

module.exports = mergeTemplate
