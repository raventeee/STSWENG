const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const path = require('path')
const favicon = require('serve-favicon')
const hbsHelpers = require('./helpers/hbsHelpers')

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  helpers: hbsHelpers
})

const routes = require('./routes/routes')
const config = require('./config')
const app = express()

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.engine('hbs', hbs.engine)
app.set('view engine', '.hbs')
app.use(express.static(path.join(__dirname, '/public')))

app.use(favicon(path.join(__dirname, 'public', 'assets', 'gtaV.jpg')))

// routes
app.use('/', routes)

// error page
app.use((req, res) => {
  res.render('error', {
    styles: ['style'],
    title: 'Error: Page Not Found'
  })
})

app.listen(config.port, config.host, () => {
  console.log('Listening to ' + config.host + ':' + config.port)
})

module.exports = app
