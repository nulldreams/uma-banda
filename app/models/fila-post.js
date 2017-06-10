var mongoose = require('mongoose')

var postSchema = new mongoose.Schema({
  id: String,
  data: String,
  publicada: { type: Boolean, default: false }
})

module.exports = mongoose.model('FilaPost', postSchema)