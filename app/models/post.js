var mongoose = require('mongoose')

var postSchema = new mongoose.Schema({
  nome_url: String,
  nome: String,
  historia: String,
  facebook: String,
  site: String,
  youtube: String,
  video_url: String,
  share_url: String,
  imagem: String,
  data: String
})

module.exports = mongoose.model('Banda', postSchema)