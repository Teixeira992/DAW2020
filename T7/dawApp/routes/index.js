var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Student = require('../controllers/student');
const student = require('../models/student');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/students', function(req, res, next) {
  Student.list()
    .then(data =>  res.render('students', { list: data }))
    .catch(err => res.render('error', {error:err}))
    ;
});

router.get('/students/:id', function (req, res, next) {
  Student.lookUp(req.params.id)
      .then(data => res.render('student', {st : data}))
      .catch(err => res.render('error', {error:err}))
    ;
})


router.get('/registar', function (req, res, next) {
  res.render('add')
})

router.get('/students/editar/:id', function (req, res, next) {
  console.log("Trying to edit " + req.params.id);
  var id = req.params.id;
  Student.lookUp(id)
      .then(student => res.render('edit', { student }))
      .catch(error => res.render('error', { error: error }))
});

router.post('/students', function (req, res) {

  const st = new student({
      numero: req.body.numero,
      nome: req.body.nome,
      git: req.body.git,
      tpc: req.body.tpc.split(",")
  })

  Student.insert(st)
      .then(st => res.redirect('/students'))
      .catch(error => res.render({ error: error }))
})

router.put("/students/:id", function (req, res, next) {
  Student.updateA(req.params.id, req.body)
      .then(dados => {
          console.log("Aluno atualizado com sucesso...")
          res.sendStatus(200)
      })
      .catch(e => res.render('error', {
          error: e
      }))
})


router.put("/students/addtpc/:id", function (req, res, next) {
  Student.addTPC(req.params.id)
      .then(dados => {
          console.log("Adicionado TPC...")
          res.sendStatus(200)
      })
      .catch(e => res.render('error', {
          error: e
      }))
})

router.put("/students/remtpc/:id", function (req, res, next) {
  Student.removeTPC(req.params.id)
      .then(dados => {
          console.log("Removido TPC...")
          res.sendStatus(200)
      })
      .catch(e => res.render('error', {
          error: e
      }))
})

router.delete('/students/:id', function (req, res) {

  var id = req.params.id

  Student.delete(id)
      .then(() => {console.log("Aluno removido com sucesso..."),
                    res.sendStatus(200)})
      .catch(error => res.render({ error: error }))
})


module.exports = router;
