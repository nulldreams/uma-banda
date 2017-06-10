const Controller = require('./controller/postCtrl.js')

exports.AcessarPost = (req, res) => {
    Controller.AcessarPost((resul) => {
        res.json(resul)
    })
}

exports.BandaDoDia = (req, res) => {
    Controller.BandaDoDia((retorno) => {
        res.json(retorno)
    })
}

exports.Publicar = (req, res) => {
    Controller.Publicar(req, (retorno) => {
        res.json(retorno)
    })
}