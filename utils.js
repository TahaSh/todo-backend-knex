const bcrypt = require('bcrypt')

exports.asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

exports.hashPassword = async (plainPassword) => {
  const saltRounds = 10
  return bcrypt.hash(plainPassword, saltRounds)
}
