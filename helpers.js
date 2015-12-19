'use strict'

const twice = Functor => checkContract => Functor(Functor(checkContract))

module.exports = { twice }
