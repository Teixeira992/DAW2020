const mongoose = require('mongoose')
var Student = require('../models/student')

module.exports.list = () =>  {
    return Student
        .find()
        .sort({nome:1})
        .exec()
}

module.exports.lookUp = id =>  {
    return Student
        .findOne({_id:id})
        .exec()
}

module.exports.insert = (data) => {
    const newA = new Student({
        _id: new mongoose.Types.ObjectId(),
        numero: data.numero,
        nome: data.nome,
        git: data.git,
        tpc: data.tpc
    })

    return newA.save()
}

module.exports.delete = (id) => {
    return Student
        .deleteOne({ _id: id })
        .exec()
}


module.exports.updateA = (id, student) => {
    return Student
        .updateOne({ _id: id }, student)
}

module.exports.addTPC = id => {
    return Student
        .updateOne({
            $and: [{
                _id: id
            }, {
                $expr: {
                    $lt: [{
                        $size: "$tpc"
                    }, 8]
                }
            }]
        }, {
            $push: {
                "tpc": [1]
            }
        })
}

// Remover um tpc ao array, ou seja, remover um valor 1 
module.exports.removeTPC = id => {
    return Student
        .updateOne({
            _id: id
        }, {
            $pop: {
                "tpc": 1
            }
        })
}