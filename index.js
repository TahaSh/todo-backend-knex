const express = require('express')
const cors = require('cors')

const userRoutes = require('./routes/user-routes')
const orgRoutes = require('./routes/org-routes')
const projectRoutes = require('./routes/project-routes')
const taskRoutes = require('./routes/task-routes')
const authRoutes = require('./routes/auth-routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req, res) => {
  res.send('HOMEPAGE')
})

// Routes
app.use('/users', userRoutes)
app.use('/orgs', orgRoutes)
app.use('/projects', projectRoutes)
app.use('/tasks', taskRoutes)
app.use('/auth', authRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Error!')
})

const port = process.env.PORT || 3000
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Listening on port ${port}`))
}

module.exports = app
