const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const path = require('path')
const dotenv = require('dotenv')

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials')
})

const routes = require('./routes/routes')
const config = require('./config')
const app = express()

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

app.engine('hbs', hbs.engine)
app.set('view engine', '.hbs')
app.use(express.static(path.join(__dirname, '/public')))

// routes
app.use('/', routes)

// error page
app.use((req, res, next) => {
  // res.render()
  res.send('ERROR')
})

app.listen(config.port, () => {
  console.log('Listening to localhost:8080')
})
