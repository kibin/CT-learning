'use strict'

const checkAny = require('./objects').checkAny
const Monad = require('./typeclasses').Monad
const twice = require('./helpers').twice

class Maybe {
  static unit(x) { return just(x) }

  flatten(checkContract = checkAny) {
    return maybeFlatten(checkContract)(this)
  }

  map(checkContract) {
    if (this instanceof Just) return just(checkContract(this.x))
    else if (this instanceof Nothing) return this
    else throw new TypeError(`Expected Nothing or Just(value)!`)
  }
}
Maybe.prototype.__proto__ = Monad.prototype

const maybeUnit = checkContract => m => (checkContract(m), maybe(checkContract)(just(m)))

const maybeFlatten = checkContract => mbs => {
  const maybies = twice(maybe)(checkContract)(mbs)
  return maybe(checkContract)(maybies instanceof Just ? maybies.x : maybies)
}

const maybe = checkContract => value => {
  if (value instanceof Nothing) return value
  else if (value instanceof Just) return just(checkContract(value.x))
  else throw new TypeError(`Expected Nothing or Just(value)!`)
}


class Nothing extends Maybe {
  toString() { return `Nothing` }
}

const nothing = new Nothing()


class Just extends Maybe {
  constructor(x) { super(), this.x = x }
  toString() { return `Just(${this.x})` }
}
const just = x => new Just(x)

module.exports = {
  Maybe,
  maybe,
  Nothing,
  nothing,
  Just,
  just,
}
