'use strict'

const banner = require('./banner')
const updateNotifier = require('update-notifier')
const pkg = require('../package.json')
const addSugar = require('./commands/addSugar')
const createProject = require('./commands/createProject')

function run(program) {
  updateNotifier({ pkg }).notify()

  banner()

  if (program.add) {
    addSugar()
  }

  createProject()
}

module.exports = run
