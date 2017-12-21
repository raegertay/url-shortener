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

const domain = 'http://localhost:3000/'

// Routes & Controllers
app.get('/', function(req, res) {
  res.render('new')
})

app.post('/urls', function(req, res) {
  // console.log(req.body)
  // res.send(req.body)
  let urlParams = req.body
  urlParams.shortUrl = generateShortUrl()

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
    res.render('new', {shortUrl: domain + url.shortUrl})
  })
})

app.get('/urls', function(req, res) {
  Url.find({}, function(err, urls) {
    if (err) {
      console.log(err)
      return
    }
    res.render('index', {urls: urls, domain: domain})
  })
})

app.get('/:shortUrl', function(req, res) {
  Url.findOne({ shortUrl: req.params.shortUrl }, function(err, url) {
    res.redirect(url.longUrl)
  })
})

app.listen(3000)

// Helper methods
const generateShortUrl = () => {
  const alphaNumerics = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijqlmnopqrstuvwxyz0123456789'
  let shortUrl = ''
  for(let i = 0; i < 6; i++) {
    shortUrl += alphaNumerics[Math.floor(Math.random() * alphaNumerics.length)]
  }
  return shortUrl
}
