'use strict'

const path = require('path')
const fs = require('fs-extra')
const mergeJson = require('./mergeJson')
const mergeJs = require('./mergeJs')

const getInfo = pathname => {
  const filename = path.basename(pathname)
  const flags = filename.match(/(\.js)?((\.spa|\.ssr)?(\.merge)?)$/)
  const isJs = Boolean(flags[1])
  const type = flags[3]
  const isMerge = Boolean(flags[4])

  return {
    ssr: type === '.ssr',
    spa: type === '.spa',
    mergeJs: isMerge && isJs,
    mergeJson: isMerge && !isJs,
    mergeExtLength: (flags[2] && flags[2].length) || 0,
  }
}

const mergeFile = (source, destination, core) => {
  const info = getInfo(source)

  // ignore files belonging to different core
  if (core && core.endsWith('[SSR]') && info.spa) return
  if (core && core.endsWith('[SPA]') && info.ssr) return

  const realDestination = destination.slice(0, -info.mergeExtLength)

  if (info.mergeJson) {
    return mergeJson(source, realDestination)
  }

  if (info.mergeJs) {
    return mergeJs(source, realDestination)
  }

  return fs.copy(source, destination)
}

module.exports = mergeFile
