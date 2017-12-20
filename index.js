const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Url = require('./models/url')

const app = express()

// Setup mongodb
mongoose.connect('mongodb://localhost/url-shortener', {
  useMongoClient: true
})
mongoose.Promise = global.Promise

// Set default layout
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
// Set handlebars to be the default view engine
app.set('view engine', 'handlebars')

// Routes & Controllers
app.get('/', function(req, res) {
  res.render('new')
})

app.listen(3000)
