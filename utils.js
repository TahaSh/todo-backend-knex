const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const accessTokenSecret =
  process.env.ACCESS_TOKEN_SECRET || 'access-token-secret'
const refreshTokenSecret =
  process.env.REFRESH_TOKEN_SECRET || 'refresh-token-secret'

exports.asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

exports.hashPassword = async (plainPassword) => {
  const saltRounds = 10
  return bcrypt.hash(plainPassword, saltRounds)
}

exports.verifyPassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword)
}

exports.createAccessToken = (userId, expiresIn = '1h') => {
  return jwt.sign({ userId }, accessTokenSecret, { expiresIn })
}

exports.createRefreshToken = (userId, expiresIn = '7d') => {
  return jwt.sign({ userId }, refreshTokenSecret, { expiresIn })
}

exports.verifyAccessToken = (accessToken) => {
  try {
    return jwt.verify(accessToken, accessTokenSecret)
  } catch (err) {
    throw new Error('Invalid or Expired Access Token')
  }
}

exports.verifyRefreshToken = (refreshToken) => {
  try {
    return jwt.verify(refreshToken, refreshTokenSecret)
  } catch (err) {
    throw new Error('Invalid or Expired Refresh Token')
  }
}
