'use strict'

const STATUS_CODES = require('http').STATUS_CODES

const $STATUS_CODE = /^([\d]+?)(?::|$)/
const $HINT = /\((.*)\)/
const $IS_NUM = /\d+/

const Shenanigans = {
  parse(message) {
    if (typeof message === 'object' && 'message' in message) {
      message = message.message
    }

    const info = {}

    if (message.match($STATUS_CODE)) {
      info.statusCode = parseInt($STATUS_CODE.exec(message)[1], 10)
      message = message.replace($STATUS_CODE, '') || STATUS_CODES[info.statusCode]
    }

    if (message.match($HINT)) {
      info.hint = $HINT.exec(message)[1]
      message = message.replace($HINT, '')
    }

    message = message.trim()

    info.message = message

    return info
  }
}

module.exports = Shenanigans
