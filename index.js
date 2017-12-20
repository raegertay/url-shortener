const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Url = require('./models/url')
const bodyParser = require('body-parser')

const app = express()

// Setup mongodb
mongoose.connect('mongodb://localhost/url-shortener', {
  useMongoClient: true
})
mongoose.Promise = global.Promise

// Tell app to use bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// Set default layout
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
// Set handlebars to be the default view engine
app.set('view engine', 'handlebars')

// Routes & Controllers
app.get('/', function(req, res) {
  res.render('new')
})

app.post('/urls', function(req, res) {
  // console.log(req.body)
  // res.send(req.body)
  let urlParams = req.body
  urlParams.shortUrl = 'acb123'

  // const newUrl = new Url(urlParams)
  // newUrl.save(function (err) {
  //   if (err) {
  //     console.log(err)
  //     return
  //   }
  //   console.log('Url created!')
  // })

  Url.create(urlParams, function(err, url) {
    if (err) {
      console.log(err)
      return
    }
    console.log(url)
    res.send(url)
  })
})

app.get('/urls', function(req, res) {
  Url.find({}, function(err, urls) {
    if (err) {
      console.log(err)
      return
    }
    res.render('index', {urls: urls})
  })
})

app.listen(3000)

// Helper methods
