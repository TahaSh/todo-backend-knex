const express = require('express')
const { asyncHandler } = require('../utils')
const router = express.Router()
const tasks = require('../db/task-queries')

router.patch(
  '/:id/assign',
  asyncHandler(async (req, res) => {
    // validate
    const results = await tasks.assign({
      taskId: req.params.id,
      userId: req.body.user_id
    })
    res.json(results)
  })
)

module.exports = router
