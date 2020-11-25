var http = require('http')
var axios = require('axios')
var static = require('./static.js')

var temp = require('./templates.js')

var serverTarefas = http.createServer(function (req,res) {
    console.log('Method: ' + req.method + ' url: ' + req.url)
    var d = new Date().toISOString().substr(0, 19)

    if (static.recursoEstatico(req)) {
        static.sirvoRecursoEstatico(req, res)
    }
    else{
        switch (req.method) {
            case "GET":
                // GET / --------------------------------------------------------------------
                if (req.url == "/") {
                    axios.get("http://localhost:3000/tarefas?_sort=datalimite&_order=asc")
                        .then(response => {
                            var tarefas = response.data
                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                            res.write(temp.formTarefa(d))
                            res.write(temp.tarefasP(tarefas))
                            axios.get("http://localhost:3000/tarefas")
                                .then(resp => {
                                    var tarefasR = resp.data
                                    res.write(temp.tarefasNP(tarefasR,d))
                                    res.end()
                                })
                                .catch(function (erro) {
                                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                    res.write("<p>Não foi possível obter a lista de tarefas...</p>")
                                    res.end()
                                })
                        })
                        .catch(function (erro) {
                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                            res.write("<p>Não foi possível obter a lista de tarefas...</p>")
                            res.end()
                        })
                }
                else {
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.write("<p>" + req.method + " " + req.url + " não suportado neste serviço.</p>")
                    res.end()
                }
                break
            case "POST":
                // POST / --------------------------------------------------------------------
                if (req.url == "/") {
                    temp.recuperaInfo(req, function (info) {
                        if (info.descricao != null){
                            info.resolvido = false
                            info.cancelado = false
                            console.log('POST de tarefa: ' + JSON.stringify(info))
                            axios.post('http://localhost:3000/tarefas', info)
                                .then(resp => {
                                    axios.get("http://localhost:3000/tarefas?_sort=datalimite&_order=asc")
                                        .then(response => {
                                            var tarefas = response.data
                                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                            res.write(temp.formTarefa(d))
                                            res.write(temp.tarefasP(tarefas))

                                            axios.get("http://localhost:3000/tarefas")
                                                .then(response => {
                                                    var tarefasR = response.data
                                                    res.write(temp.tarefasNP(tarefasR,d))
                                                    res.end()
                                                })
                                                .catch(function (erro) {
                                                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                                    res.write("<p>Não foi possível obter a lista de tarefas...</p>")
                                                    res.end()
                                                })
                                        })
                                        .catch(function (erro) {
                                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                            res.write("<p>Não foi possível obter a lista de tarefas...</p>")
                                            res.end()
                                        })
                                })
                                .catch(erro => {
                                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                    res.write('<p>Erro no POST ' + erro + '</p>')
                                    res.write('<p><a href="/">Voltar</a></p>')
                                    res.end()
                                })
                        }
                        else{
                            axios.get("http://localhost:3000/tarefas")
                                .then(response => {
                                    var tarefas = response.data
                                    var rState = false
                                    var cState = false
                                    if(info.estado == "Resolvido") rState = true
                                    else if(info.estado == "Cancelado") cState = true
                                    else {}

                                    tarefas.forEach(t => {
                                        if(t.id == info.id) {
                                            axios.put('http://localhost:3000/tarefas/' + info.id, {
                                                "id": t.id,
                                                "datacriacao": t.datacriacao,
                                                "datalimite": t.datalimite,
                                                "descricao": t.descricao,
                                                "responsavel": t.responsavel,
                                                "tipo": t.tipo,
                                                "resolvido": rState,
                                                "cancelado": cState
                                            }).then(resp => {
                                                console.log(resp.data);
                                            })
                                                .catch(error => {
                                                    console.log("ERRO: " + error)
                                                });
                                        }
                                    })

                                    axios.get("http://localhost:3000/tarefas?_sort=datalimite&_order=asc")
                                        .then(response => {
                                            var tarefas = response.data
                                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                            res.write(temp.formTarefa(d))
                                            res.write(temp.tarefasP(tarefas))
                                            axios.get("http://localhost:3000/tarefas")
                                                .then(resp => {
                                                    var tarefasR = resp.data
                                                    res.write(temp.tarefasNP(tarefasR,d))
                                                    res.end()
                                                })
                                                .catch(function (erro) {
                                                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                                    res.write("<p>Não foi possível obter a lista de tarefas...</p>")
                                                    res.end()
                                                })
                                        })
                                        .catch(function (erro) {
                                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                            res.write("<p>Não foi possível obter a lista de tarefas...</p>")
                                            res.end()
                                        })

                                })
                                .catch(function (erro) {
                                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                    res.write("<p>Não foi possível obter a lista de tarefas...</p>")
                                    res.end()
                                })
                        }
                        
                    })
                }
                else {
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.write("<p>" + req.method + " " + req.url + " não suportado neste serviço.</p>")
                    res.end()
                }
                break
            default:
                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                res.write("<p>" + req.method + " não suportado neste serviço.</p>")
                res.end()
        }
    }
})
serverTarefas.listen(7777)
console.log('Servidor à escuta na porta 7777...')