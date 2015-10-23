'use strict'

const Assert = require('assert')
const Shenanigans = require('./shenanigans')

const message = '404: Hello world (Try this!)'

const expectedInfo = {
  statusCode: 404,
  message: 'Hello world',
  hint: 'Try this!'
}

const error = new Error(message)

Assert.deepEqual(Shenanigans.parse(message), expectedInfo)
Assert.deepEqual(Shenanigans.parse(error), expectedInfo)
Assert.deepEqual(Shenanigans.parse('404'), { statusCode: 404, message: 'Not Found' })

console.log('Tests passed')
