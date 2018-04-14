#!/usr/bin/env node

'use strict'

if (process.versions.node.split('.')[0] < 8) {
  console.error(
    'In order to execute code that contains the async or await keywords, you need to have at least version 8.0.0 of Node.js installed'
  )
  process.exit(1)
}

const program = require('commander')
const run = require('../lib')
const rootPkg = require('../package.json')

program
  .version(rootPkg.version)
  .usage('<projectDirName>')
  .option('-a, --add', 'Add more sugar to existing project')
  .parse(process.argv)

run(program)
