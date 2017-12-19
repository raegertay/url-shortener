const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

const app = express()

moongoose.connect('mongodb://localhost/url-shortener', {
  useMongoClient: true
})
mongoose.Promise = global.Promise

// Set default layout
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
// Set handlebars to be the default view engine
app.set('view engine', 'handlebars')

app.get('/', function(req, res) {
  res.render('home')
})

app.listen(3000)
