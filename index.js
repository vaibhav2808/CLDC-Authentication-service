const express = require('express')
const app = express()
const port = 3001
const mongoose = require('mongoose')
const morgan = require('morgan')
const databaseConfig = require('./config/database')
const passport = require('passport')
const JwtStrategy = require('./auth/jwt')
const cors = require('cors')

const { errorHandler } = require('./middlewares/error')
const route = require('./routes/index')

const logger = morgan('dev')

passport.use('jwt', JwtStrategy)
app.use(cors())
app.use(logger)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', route)

app.use(errorHandler)

mongoose.connect(databaseConfig.url, databaseConfig.options).then(() => {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}
).catch(err => {
  console.log(err)
})
