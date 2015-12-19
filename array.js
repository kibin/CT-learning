'use strict'

const cts = require('./objects')
const Monad = require('./typeclasses').Monad
const twice = require('./helpers').twice

class ArrayM extends Monad {
  static unit(x) { return new ArrayM(x) }

  constructor(...args) {
    super()
    this.x = [...args]
  }

  flatten(checkContract) {
    const contract = checkContract !== void 0 ? checkContract : cts.checkAny

    return arrayOfFlatten(contract)(this)
  }

  map(checkContract) {
    return new ArrayM(...this.x.map(checkContract))
  }

  reduce(acc, el) {
    return new ArrayM(...this.x.reduce(acc, el))
  }

  toString() {
    return `ArrayM[${this.x}]`
  }
}

const arrayOf = checkContract => arr => {
  if (arr instanceof ArrayM) return arr.map(checkContract)
  else throw new TypeError(`Expected type to be ArrayM!`)
}

const arrayOfUnit = checkContract => arr =>
  (checkContract(arr), arrayOf(checkContract)([arr]))

const arrayOfFlatten = checkContract => arrs => {
  const arrays = twice(arrayOf)(checkContract)(arrs)
    .reduce((arr, el) => arr.x.concat(el.x), new ArrayM())

  return arrayOf(checkContract)(arrays)
}

const arrayM = arr => new ArrayM(...arr)

module.exports = {
  ArrayM,
  arrayM,
}
