const express = require('express')
const {
  asyncHandler,
  verifyPassword,
  createAccessToken,
  createRefreshToken
} = require('../utils')
const router = express.Router()
const users = require('../db/user-queries')

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const user = await users.byEmail(req.body.email)
    if (!user) {
      return res.status(401).json({ message: 'Invalid Credentials' })
    }
    const passwordCorrect = await verifyPassword(
      req.body.password,
      user.password
    )
    if (!passwordCorrect) {
      return res.status(401).json({ message: 'Invalid Credentials' })
    }
    res.status(200).json({
      access_token: createAccessToken(user.id),
      refresh_token: createRefreshToken(user.id)
    })
  })
)

module.exports = router
