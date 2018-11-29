#!/usr/bin/env node

'use strict'

const updateNotifier = require('update-notifier')
const meow = require('meow')
const chalk = require('chalk')

const create = require('../src/create')
const pkg = require('../package')

updateNotifier({ pkg }).notify()
require('please-upgrade-node')(pkg)

const cli = meow(`
  ${chalk.gray('Usage')}

    ${chalk.gray('$')} create-strv-app ${chalk.yellow('[project-directory]')}
`)

create(cli.input[0] || '.')
