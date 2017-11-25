const express = require('express');
const app = express();

const bodyParser= require('body-parser')

var mustacheExpress = require('mustache-express');
app.engine('mustache', mustacheExpress());

app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'mustache');
app.set('views', __dirname + '/website');

app.use(express.static('website'))

const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://127.0.0.1:27017/museumhack', (err, database) => {
  db = database
  app.listen(3000, function(){})
})

app.get('/', function (req, res) {
  db.collection('objects').find().toArray(function(err, results) {
    res.render('index', { title: 'Stuff in the Museum', message: 'Hello there!', results: results })
  })
})


app.post("/", function (req, res) {
  db.collection('objects').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})