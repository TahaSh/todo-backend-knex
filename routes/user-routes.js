const express = require('express')
const { asyncHandler } = require('../utils')
const router = express.Router()
const users = require('../db/user-queries')

router.post(
  '/',
  asyncHandler(async (req, res) => {
    // validate input, email is valid, name is valid, etc
    const result = await users.create({
      name: req.body.name,
      email: req.body.email
    })
    res.json(result)
  })
)

router.get(
  '/',
  asyncHandler(async (req, res) => {
    // validate input, email is valid, name is valid, etc
    const results = await users.all()
    res.json(results)
  })
)

module.exports = router
