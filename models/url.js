const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlSchema = new Schema({
  long_url: { type: String, required: true, unique: true }
  short_url: String
})

const Url = mongoose.model('Url', urlSchema)

module.exports = Url
