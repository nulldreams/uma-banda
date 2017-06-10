const Fila      = require('../models/fila-post')
const PublicacaoDoDia      = require('../models/publicacao-do-dia')
const schedule  = require('node-schedule')

exports.Monitorar = () => {
    let rule = new schedule.RecurrenceRule()
    rule.second = 30
    rule.hour = 3
    rule.minute = 37

    let j = schedule.scheduleJob(rule, () => {
        ConsultaFila((retorno) => {
            console.log(retorno)
        })
    })
}

var ConsultaFila = (callback) => {
    Fila.find({}, (err, lista) => {
        if (err) throw err

        let publicacao = new PublicacaoDoDia({
            id: lista[0].id
        })

        publicacao.save((err) => {
            if (err) throw err
            Fila.remove({ _id: lista[0]._id }, (err) => {
                if (err) throw err
                
                callback(true)
            })
        })
    })
}