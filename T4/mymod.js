exports.myDateTime = function (){
    var d = new Date()
    return d.toISOString().substring(0,16)
    }

exports.myName = function(){
    return "Teixeira"
}

exports.turma = "DAW 2020";
