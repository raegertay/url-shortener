const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

// Set default layout
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
// Set handlebars to be the default view engine
app.set('view engine', 'handlebars')

app.get('/', function(req, res) {

})

app.listen(3000)
