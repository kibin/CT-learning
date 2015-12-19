'use strict'

const ar = require('./array')
const mb = require('./maybe')

const arrayM = ar.arrayM
const ArrayM = ar.ArrayM

const just = mb.just
const nothing = mb.nothing
const maybe = mb.maybe

const xs = arrayM([1]), ys = arrayM([2]), zs = arrayM([3])
console.log(`` + xs.flatMap(x => ys.flatMap(y => zs.map(z => x * y + z))))

const xm = just(5), ym = just(6), zm = just(5)
console.log(`` + xm.flatMap(x => ym.flatMap(y => zm.map(z => x * y + z))))
