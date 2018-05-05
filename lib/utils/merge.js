'use strict'

const mergeWith = require('lodash.mergewith')
const isArray = require('lodash.isarray')

function strategy(objValue, srcValue) {
  if (isArray(objValue)) {
    return objValue.concat(srcValue)
  }
}

module.exports = (objA, objB) => {
  return mergeWith(objA, objB, strategy)
}
