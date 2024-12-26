const { verifyAccessToken } = require('../utils')

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization']
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Invalid Authorization Header' })
  }
  const token = authHeader.split(' ')[1]
  try {
    const { userId } = verifyAccessToken(token)
    req.userId = userId
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid Access Token' })
  }
}
