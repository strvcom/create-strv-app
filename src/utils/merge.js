'use strict'

const mergeWith = require('lodash.mergewith')
const isArray = require('lodash.isarray')

module.exports = (objA, objB) =>
  mergeWith(objA, objB, (objValue, srcValue) => {
    if (isArray(objValue)) {
      return objValue.concat(srcValue)
    }
  })
