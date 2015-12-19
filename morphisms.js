'use strict'

const checkString = require('./objects').checkString

const repeat = str => (checkString(str), str + str)

module.exports = { repeat }
