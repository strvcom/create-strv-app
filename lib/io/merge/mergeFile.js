'use strict'

const path = require('path')
const fs = require('fs-extra')
const mergeJson = require('./mergeJson')
const mergeJs = require('./mergeJs')

// https://stackoverflow.com/questions/190852/how-can-i-get-file-extensions-with-javascript/12900504#12900504
const getExtension = filename =>
  filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2)

const removeExtension = (filename, extension) => {
  if (!extension) {
    return filename
  }
  return filename.slice(0, -(extension.length + 1))
}

const getInfo = pathname => {
  const filename = path.basename(pathname)
  const end = getExtension(filename)

  if (['spa', 'ssr'].includes(end)) {
    const extension = getExtension(removeExtension(filename, end))
    return {
      type: end,
      extension,
    }
  }

  return {
    type: null,
    extension: end,
  }
}

const mergeFile = async (source, destination, core) => {
  const info = getInfo(source)

  // ignore files belonging to different core
  if (core && core.endsWith('[SSR]') && info.type === 'spa') return
  if (core && core.endsWith('[SPA]') && info.type === 'ssr') return

  const realDestination = removeExtension(destination, info.type)
  const destinationExists = await fs.pathExists(realDestination)

  if (destinationExists) {
    if (info.extension === 'js') {
      return mergeJs(source, realDestination)
    }
    return mergeJson(source, realDestination)
  }

  return fs.copy(source, realDestination)
}

module.exports = mergeFile
