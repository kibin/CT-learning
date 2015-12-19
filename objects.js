'use strict'

const checkString = str => {
  if (typeof str != `string`) throw new TypeError(`Expected a string!`)
  return str
}

const typeOf = type => (checkString(type), arg => {
  if (typeof arg != type) throw new TypeError(`Expected a ${type}!`)
  return arg
})

const checkBoolean = typeOf(`boolean`)
const checkObject = typeOf(`object`)
const checkFunction = typeOf(`function`)
const checkNumber = typeOf(`number`)
const checkUndefined = typeOf(`undefined`)

const checkArray = arr => {
  if (!Array.isArray(arr)) throw new TypeError(`Expected an array!`)
  return arr
}

const checkAny = any => any

module.exports = {
  checkString,
  checkBoolean,
  checkObject,
  checkFunction,
  checkNumber,
  checkUndefined,
  checkAny,
  checkArray,
}
