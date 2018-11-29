'use strict'

module.exports = api => {
  api.copy(require.resolve('./templates'))
}
