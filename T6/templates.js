var { parse } = require("querystring")

function recuperaInfo(request, callback) {
    if (request.headers['content-type'] == 'application/x-www-form-urlencoded') {
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', () => {
            console.log(body)
            callback(parse(body))
        })
    }
}

function formTarefa(d){
    var data_hoje=d.split("T")[0]
    return `
    <html>
    <head>
        <title>Registo de Tarefa</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="/public/favicon.png"/>
        <link rel="stylesheet" href="/public/w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h2>Registo de Tarefa</h2>
            </header>
            <form class="w3-container" action="/" method="POST">
                <label class="w3-text-teal"><b>Descrição</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="descricao">
          
                <label class="w3-text-teal"><b>Responsável</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="responsavel">

                <label class="w3-text-teal"><b>Tipo</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="tipo">

                <label class="w3-text-teal"><b>Data Limite</b></label>
                <input class="w3-input w3-border w3-light-grey" type="date" name="datalimite">

                <input type="hidden" name="datacriacao"  type="date" value="`+data_hoje+`"/>
                <input type="hidden" name="resolvido" value="false"/>
                <input type="hidden" name="cancelado" value="false"/>

                <input class="w3-btn w3-blue-grey" type="submit" value="Registar"/>
                <input class="w3-btn w3-blue-grey" type="reset" value="Limpar valores"/> 
            </form>
            
        </div>
    `
}

function tarefasP(tarefas){
    let pagHTML = `
    <html>
    <head>
        <title>Lista de Tarefas Pendentes</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="/public/favicon.png"/>
        <link rel="stylesheet" href="/public/w3.css"/>
    </head>
    <body>
        <div class="w3-container w3-teal">
            <h2>Lista de Tarefas Pendentes</h2>
        </div>
        <table class="w3-table w3-bordered">
                <tr>
                    <th>Data Limite</th>
                    <th>Data Criação</th>
                    <th>Descrição</th>
                    <th>Responsável</th>
                    <th>Tipo</th>
                    <th>Estado</th>
                </tr>
    `
    tarefas.forEach(t => {
        if(t.resolvido == false && t.cancelado == false){
            pagHTML += `
            <tr>
                <td>${t.datalimite}</td>
                <td>${t.datacriacao}</td>
                <td>${t.descricao}</td>
                <td>${t.responsavel}</td>
                <td>${t.tipo}</td>
                <td width="20%">
                    <form action="/" method="POST">
                        <input type=hidden name="id" value="${t.id}"/>
                        <select name="estado">
                            <option></option>
                            <option>Resolvido</option>
                            <option>Cancelado</option>
                            </select>
                        <input class="w3-btn w3-blue-grey" type="submit" value="Registar"/>
                    </form>
                </td>
            </tr>
        `
        }  
    })
    pagHTML+= `
        </table>
        </body>
    </html>
    `
    return pagHTML
}

function tarefasNP(tarefas,d){
    let pagHTML = `
    <html>
        <head>
            <title>Lista de Tarefas</title>
            <meta charset="utf-8"/>
            <link rel="icon" href="/public/favicon.png"/>
            <link rel="stylesheet" href="/public/w3.css"/>
        </head>
        <body>
            <div class="w3-container w3-teal">
                <h2>Lista de Tarefas</h2>
            </div>
            <table class="w3-table w3-bordered">
                <tr>
                    <th>Data Limite</th>
                    <th>Data Criação</th>
                    <th>Descrição</th>
                    <th>Responsavel</th>
                    <th>Tipo</th>
                    <th>Estado</th>
                </tr>
    `
    tarefas.forEach(t => {
      if(t.resolvido){
        pagHTML += `
        <tr>
            <td>${t.datalimite}</td> 
            <td>${t.datacriacao}</td>
            <td>${t.descricao}</td>
            <td>${t.responsavel}</td>
            <td>${t.tipo}</td>
            <td>Resolvido</td>
        </tr>
      `
      }
      else if(t.cancelado){
        pagHTML += `
        <tr>
            <td>${t.datalimite}</td> 
            <td>${t.datacriacao}</td>
            <td>${t.descricao}</td>
            <td>${t.responsavel}</td>
            <td>${t.tipo}</td>
            <td>Cancelado</td>
        </tr>
      `
      }

    })

    pagHTML += `
            </table>
        <footer class="w3-container w3-teal">
                <address>Gerado por serverTarefas::DAW2020 em ${d}</address>
        </footer>
        </body>
    </html>
  `
  return pagHTML
}

module.exports = {
    recuperaInfo,
    formTarefa,
    tarefasP,
    tarefasNP
}