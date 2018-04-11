'use strict'

const chalk = require('chalk')
const logSymbols = require('log-symbols')

const info = text => {
  process.stderr.write(`${logSymbols.info} ${chalk.blue(' INFO ')}${text}\n`)
}

const warn = text => {
  process.stdout.write(
    `${logSymbols.warning}${chalk.yellow(' WARN ')}${text}\n`
  )
}

const error = text => {
  process.stderr.write(`${logSymbols.error}${chalk.red(' ERROR ')}${text}\n`)
}

module.exports = {
  warn,
  info,
  error,
}
