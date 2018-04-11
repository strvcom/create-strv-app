'use strict'

const { resolve } = require('path')
const { writeJson } = require('fs-extra')

const firebaseJson = {
  hosting: {
    public: 'build',
    ignore: ['firebase.json', '**/.*', '**/node_modules/**'],
    rewrites: [
      {
        source: '**',
        destination: '/index.html',
      },
    ],
    headers: [
      {
        source: '/service-worker.js',
        headers: [{ key: 'Cache-Control', value: 'no-cache' }],
      },
    ],
  },
}

module.exports = async projectPath => {
  const path = resolve(projectPath, 'firebase.json')
  await writeJson(path, firebaseJson, { spaces: '  ' })
}
