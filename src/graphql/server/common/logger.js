const pino = require('pino')
const memoize = require('fast-memoize')

module.exports = memoize(function logger(name) {
  return pino({
    name,
    enabled: !process.env.DISABLE_LOGGING || true,
  })
})
