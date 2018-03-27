'use strict'

const chalk = require('chalk')

// ${chalk.green('-l, --list')}      Show available templates
module.exports = () => {
  const usage = `\n  Usage: ${chalk.green('create-strv-app')}

  Options:
  ${chalk.green('-v, --version')}   Output the version number
  ${chalk.green('-h, --help')}      Show this usage information
  ${chalk.green('--npm')}           Use npm to install dependencies
  `

  return usage
}
