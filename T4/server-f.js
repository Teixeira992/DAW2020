var http = require('http')
var url = require('url')
var fs = require('fs')
var aux = require('./mymod.js')

http.createServer(function (req,res){
  console.log(req.method + " " + req.url + " " + aux.myDateTime())
  var _length = req.url.split("/").length
  var i2 = req.url.split("/")[2]
  var num =/[0-9]+/.exec(i2)
  console.log(_length)
  console.log(num)
  
  if(i2=="index.html"){
    fs.readFile('./arqs/index.html',function(err,data){
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write(data)
        res.end()
    })

  }
  else {
        if(_length==3 && req.url.match(/\/arqs\/arq[1-9][0-9]*.html$/) && parseInt(num) <= 122){
          fs.readFile('./arqs/arq' + num + '.html',function(err,data) {
              res.writeHead(200, {'Content-Type': 'text/html'})
              res.write(data)
              res.end()
          })
        }
        else{
             res.writeHead(200, {'Content-Type': 'text/html'})
             res.write("<p>URL não corresponde ao esperado.</p>")
             res.end()
        }
  }
}).listen(7777)
console.log('Servidor á escuta na porta 7777 ....')