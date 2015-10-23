'use strict'

const STATUS_CODES = require('http').STATUS_CODES

const $STATUS_CODE = /^([\d]+?)(?::|$)/
const $HINT = /\((.*)\)/
const $IS_NUM = /\d+/

const Shenanigans = {
  parse(message, options) {
    options = options || {}
    const statusCode = options.statusCode || true
    const hint = options.hint || true
    const assertion = options.assertion || true

    if (message instanceof Error) {
      if (assertion && message.name === 'AssertionError') {
        message = (statusCode ? '404: ' : '') + (hint ? `Failed assertion (${message.message})` : message.message)
      }
    }

    if (typeof message === 'object' && 'message' in message) {
      message = message.message
    }

    const info = {}

    if (statusCode && message.match($STATUS_CODE)) {
      info.statusCode = parseInt($STATUS_CODE.exec(message)[1], 10)
      message = message.replace($STATUS_CODE, '') || STATUS_CODES[info.statusCode]
    }

    if (hint && message.match($HINT)) {
      info.hint = $HINT.exec(message)[1]
      message = message.replace($HINT, '')
    }

    message = message.trim()

    info.message = message

    return info
  }
}

module.exports = Shenanigans
