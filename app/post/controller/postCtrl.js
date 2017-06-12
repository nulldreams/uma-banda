const Post = require('../../models/post.js')
const PostFila = require('../../models/fila-post')
const PublicacaoDoDia = require('../../models/publicacao-do-dia')
const moment = require('moment')
const knox = require('knox');
const client = knox.createClient({
    key: '--key',
    secret: '--secret',
    bucket: '--bucket'
})
const FB = require('fb')
      

exports.AcessarPost = (callback) => {
    Post.find({}, (err, post) => {
        if (typeof post !== 'undefined') {
            callback(post)
        }
    })
}

exports.AcessarBanda = (nome, callback) => {
    Post.find({ nome_url: nome }, (err, banda) => {
        if (err) throw err

        callback(banda[0])
    })
}

exports.BandaDoDia = (callback) => {
    PublicacaoDoDia.find({}, (err, publicacao) => {
        if (err) throw err
        Post.findById(publicacao[0].id, (err, banda) => {
            callback(banda)
        })
    })
}

exports.Compartilhar = (callback) => {
    FB.options({ version: 'v2.4' })
    
}

exports.Publicar = (req, callback) => {
    let nome_url = req.body.nome.replace(/[^\w\s]/gi, '').replace(/ /g, '-').toLowerCase()
    let nPub = new Post({
        nome_url: nome_url,
        nome: req.body.nome,
        historia: req.body.historia,
        facebook: req.body.facebook,
        site: req.body.site,
        youtube: req.body.youtube,
        video_url: req.body.video_url,
        share_url: req.body.share_url,
        data: moment().format('DD-MM-YYYY HH:mm:ss')
    })

    Postar(nPub, req, (sucesso) => {
        if (sucesso) return callback({
            status: 200,
            result: 'ok.'
        })

        return callback({
            status: 500,
            result: 'Ocorreu um erro.'
        })
    })
}

var Postar = (obj, req, callback) => {
    UploadAmazon(req.file, (url) => {
        obj.imagem = url

        obj.save((err, result) => {

            if (err) return callback(false)

            let fila = new PostFila({
                id: result._id,
                data: moment().format('DD-MM-YYYY')
            })

            fila.save((err) => {
                if (err) throw err

                callback(true)
            })

        })
    })
}


var UploadAmazon = (arquivo, callback) => {
    console.log('Arquivo', arquivo)
    client.putFile(arquivo.path, arquivo.filename, {
        'x-amz-acl': 'public-read'
    }, (err, response) => {
        if (err) console.log('Erro', err)
        console.log(response.req)
        callback(response.req.url)
    })
}
