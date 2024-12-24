const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req, res) => {
  res.send('HOMEPAGE')
})

// Routes

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Error!')
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))