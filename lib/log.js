'use strict'

const chalk = require('chalk')

const warn = (text, code = 1) => {
  console.log(` ⚠️  ${chalk.yellow(text)}\n`)
  process.exit(code) // eslint-disable-line
}

const info = (text, code = 1) => {
  process.stderr.write(`${chalk.blue(text)}\n`)
  process.exit(code) // eslint-disable-line
}

const error = (text, code = 1) => {
  process.stdout.write(` 🚨  ${chalk.red(text)}\n`)
  process.exit(code) // eslint-disable-line
}

module.exports = {
  error,
  info,
  warn,
}
