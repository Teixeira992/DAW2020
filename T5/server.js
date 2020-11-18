var http = require('http')
var axios = require('axios')

http.createServer(function (req,res){
    console.log(req.method + ' ' + req.url)
    if(req.method == 'GET'){
        if(req.url == '/'){
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.write( '<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>')
            res.write('<h2 style="margin:15px">Escola de Música</h2>')
            res.write('<ul>')
            res.write('<li> <a href="/alunos"> Lista de Alunos</a></li>')
            res.write('<li> <a href="/cursos"> Lista de Cursos</a></li>')
            res.write('<li> <a href="/instrumentos"> Lista de Instrumentos</a></li>')
            res.write('</ul>')
            res.end()
        }
        else if(req.url == '/alunos'){
            axios.get('http://localhost:3000/alunos?_sort=nome&_order=asc')
            .then(function(resp){
                alunos = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write( '<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>')
                res.write('<h2 style="margin:15px">Escola de Música: Lista de Alunos</h2>')
                res.write('<ul>')
                alunos.forEach(a => {
                    res.write('<li><a href=alunos/' + a.id + '>'  + a.id + ' - ' + a.nome + '</li>')
                   
                });
                res.write('</ul>')
                res.write('<address> [<a href ="/">Voltar</a>]</address>')
                res.end()
            })
            .catch(function(error) {
            console.log('Erro Alunos: ' + error);
            });
        }
        
        else if(req.url == '/cursos'){
            axios.get('http://localhost:3000/cursos?_sort=id&_order=asc')
            .then(function(resp){
                cursos = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write( '<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>')
                res.write('<h2 style="margin:15px">Escola de Música: Lista de Cursos</h2>')
                res.write('<ul>')
                cursos.forEach(c => {
                    res.write('<li><a href=cursos/' + c.id + '>' + c.id + ' - ' + c.designacao + '</a></li>')
                   
                });
                res.write('</ul>')
                res.write('<address> [<a href ="/">Voltar</a>]</address>')
                res.end()
            })
            .catch(function(error) {
            console.log('Erro Cursos: ' + error);
            });
        }

        else if(req.url == '/instrumentos'){
            axios.get('http://localhost:3000/instrumentos')
            .then(function(resp){
                inst = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write( '<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>')
                res.write('<h2 style="margin:15px">Escola de Música: Lista de Instrumentos</h2>')
                res.write('<ul>')
                inst.forEach(i => {
                    res.write('<li><a href=instrumentos/' + i.id + '>' + i.id + ' - ' + i["#text"] + '</a></li>')
                   
                });
                res.write('</ul>')
                res.write('<address> [<a href ="/">Voltar</a>]</address>')
                res.end()
            })
            .catch(function(error) {
            console.log('Erro Instrumentos: ' + error);
            });
        }

        else if (req.url.match(/alunos\/A[0-9]+|AE-[0-9]+/)){
            var id = req.url.split("/")[2]
            axios.get('http://localhost:3000/alunos/'+id)
                .then(function (resp){
                    aluno = resp.data
                    res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                    res.write( '<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>')
                    res.write('<h2 style="margin:15px">Aluno: '+ aluno.nome + '</h2>')
                    res.write('<ul>')
                    res.write('<li>'+ '<b> Número: </b>' + aluno.id + '</li>')
                    res.write('<li>'+ '<b> Nome: </b>' + aluno.nome + '</li>')
                    res.write('<li>'+ '<b> Data de Nascimento: </b>' +  aluno.dataNasc + '</li>')
                    res.write('<li>'+ '<b> Curso: </b>' + aluno.curso + '</li>')
                    res.write('<li>'+ '<b> Ano do Curso: </b>' + aluno.anoCurso + '</li>')
                    res.write('<li>'+ '<b> Instrumento: </b>' + aluno.instrumento + '</li>')
                    res.write('</ul>')
                    res.write('<address>[<a href="/alunos">Voltar</a>]</address>')
                    res.end()
                })
                .catch(function(error){
                    console.log("Erro Aluno " + error);
                })
        }

        else if (req.url.match(/cursos\/(CB[0-9]+|CS[0-9]+)/)){
            var id = req.url.split("/")[2]
            var idC =/[0-9]+/.exec(id)
            axios.get('http://localhost:3000/cursos/'+id)
                .then(function (resp){
                    curso = resp.data
                    res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                    res.write( '<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>')
                    res.write('<h2 style="margin:15px">Curso: '+ curso.designacao + '</h2>')
                    res.write('<ul>')
                    res.write('<li>'+ '<b> ID: </b>' + curso.id + '</li>')
                    res.write('<li>'+ '<b> Designação: </b>' + curso.designacao + '</li>')
                    res.write('<li>'+ '<b> Duração: </b>' +  curso.duracao + '</li>')
                    res.write('<li>'+ '<b> Instrumento: </b>' +  curso.instrumento["#text"] + '</li>')
                    res.write('<li>'+ '<b> Instrumento ID: </b>' +  curso.instrumento.id + '</li>')
                    res.write('</ul>')
                    res.write('<address>[<a href="/cursos">Voltar</a>]</address>')
                    res.end()
                })
                .catch(function(error){
                    console.log("Erro Curso " + error);
                })
        }
        else if (req.url.match(/instrumentos\/I[0-9]+/)){
            var id = req.url.split("/")[2]
            var idC =/[0-9]+/.exec(id)
            axios.get('http://localhost:3000/instrumentos/'+id)
                .then(function (resp){
                    instr = resp.data
                    res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                    res.write( '<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>')
                    res.write('<h2 style="margin:15px">Instrumento: '+ instr["#text"] + '</h2>')
                    res.write('<ul>')
                    res.write('<li>'+ '<b> ID: </b>' + instr.id + '</li>')
                    res.write('<li>'+ '<b> Instrumento: </b>' +  instr["#text"] + '</li>')
                    res.write('</ul>')
                    res.write('<address>[<a href="/instrumentos">Voltar</a>]</address>')
                    res.end()
                })
                .catch(function(error){
                    console.log("Erro Instrumento " + error);
                })
        }
        else{
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write("<p>Pedido nao suportado: " + req.method + " " + req.url + "</p>")
            res.end()
        }   
    }
    else{
         res.writeHead(200, {'Content-Type': 'text/html'})
         res.write("<p>Pedido nao suportado: " + req.method + " " + req.url + "</p>")
         res.end()
    }
}).listen(7777)
console.log('Servidor á escuta na porta 7777 ....')