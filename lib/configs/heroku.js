'use strict'

const updatePkg = require('../utils/update-pkg')

const pkg = {
  scripts: {
    start: 'next start -p $PORT',
    'heroku-postbuild': 'next build',
  },
}

module.exports = async path => {
  await updatePkg(path, pkg)
}
