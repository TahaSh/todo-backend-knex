const express = require('express')
const { asyncHandler } = require('../utils')
const router = express.Router()
const projects = require('../db/project-queries')
const tasks = require('../db/task-queries')

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    // validate
    const results = await projects.get(req.params.id)
    res.json(results)
  })
)

router.post(
  '/:projectId/tasks',
  asyncHandler(async (req, res) => {
    // validate
    const results = await tasks.createInProject({
      projectId: req.params.projectId,
      title: req.body.title,
      status: req.body.status
    })
    res.json(results)
  })
)

router.get(
  '/:projectId/tasks',
  asyncHandler(async (req, res) => {
    // validate
    const results = await tasks.allInProject(req.params.projectId)
    res.json(results)
  })
)

module.exports = router
