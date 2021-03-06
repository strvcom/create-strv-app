'use strict'

module.exports = (obj, keyOrder) => {
  const res = {}

  if (keyOrder) {
    keyOrder.forEach(key => {
      res[key] = obj[key]
      delete obj[key]
    })
  }

  const keys = Object.keys(obj)

  keys.sort()
  keys.forEach(key => {
    res[key] = obj[key]
  })

  return res
}
