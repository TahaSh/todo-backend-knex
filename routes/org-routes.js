const express = require('express')
const { asyncHandler } = require('../utils')
const router = express.Router()
const users = require('../db/user-queries')
const orgs = require('../db/org-queries')
const orgUsers = require('../db/org-users-queries')
const projects = require('../db/project-queries')
const auth = require('../middlewares/auth')

router.post(
  '/',
  auth,
  asyncHandler(async (req, res) => {
    // validate
    const createdOrg = await orgs.create({
      name: req.body.name,
      ownerId: req.userId
    })

    const result = await orgUsers.addUserToOrg({
      orgId: createdOrg.id,
      userId: req.userId,
      role: 'admin'
    })
    res.json(result)
  })
)

router.post(
  '/:orgId/users',
  asyncHandler(async (req, res) => {
    // validate input, email is valid, name is valid, etc
    const user = await users.create({
      name: req.body.name,
      email: req.body.email
    })
    const result = await orgUsers.addUserToOrg({
      userId: user.id,
      orgId: req.params.orgId,
      role: req.body.role
    })
    res.json(result)
  })
)

router.post(
  '/:orgId/projects',
  asyncHandler(async (req, res) => {
    // validate
    const result = await projects.create({
      orgId: req.params.orgId,
      name: req.body.name
    })
    res.json(result)
  })
)

router.get(
  '/:orgId/projects',
  asyncHandler(async (req, res) => {
    // validate
    const result = await projects.allInOrg(req.params.orgId)
    res.json(result)
  })
)

router.get(
  '/:orgId/users',
  asyncHandler(async (req, res) => {
    // validate
    const result = await orgUsers.allUsersInOrg(req.params.orgId)
    res.json(result)
  })
)

router.get(
  '/',
  auth,
  asyncHandler(async (req, res) => {
    const results = await orgs.allForUser(req.userId)
    res.json(results)
  })
)

module.exports = router
