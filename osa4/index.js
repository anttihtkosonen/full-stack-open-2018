const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogRouter')
const morgan = require('morgan')
const config = require('./utils/config')


morgan.token('content', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :content :status :res[content-length] - :response-time ms'))


if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))


mongoose
  .connect(config.mongoUrl, { useNewUrlParser: true })
  .then( () => {
    console.log('connected to database', config.mongoUrl)
  })
  .catch( err => {
    console.log(err)
  })

app.use('/api/blogs', blogRouter)

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}