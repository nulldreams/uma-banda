var mongoose = require('mongoose')

var postSchema = new mongoose.Schema({
  id: String
})

module.exports = mongoose.model('PublicacaoDoDia', postSchema)