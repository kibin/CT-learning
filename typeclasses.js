'use strict'

class Monad {
  flatMap(checkContract) {
    return this.map(checkContract).flatten()
  }
}

module.exports = { Monad }
