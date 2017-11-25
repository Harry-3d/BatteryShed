const express = require('express');
const app = express();

const bodyParser= require('body-parser')
const paginate = require('express-paginate');

var mustacheExpress = require('mustache-express');
app.engine('mustache', mustacheExpress());

app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs');
app.set('views', __dirname + '/website');

app.use(express.static('website'))
app.use(paginate.middleware(10, 50));

const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://127.0.0.1:27017/museumhack', (err, database) => {
  db = database
  app.listen(3000, function(){})
})

app.get('/', function (req, res) {
  db.collection('objects').count(function(err, count) {
  db.collection('objects').find().limit(req.query.limit).skip(req.skip).toArray(function(err, results) {
      const pageCount = Math.ceil(count / req.query.limit);
      res.render('index', {
          results: results,
          count: count,
          pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
       })
    })
  })
})


app.post("/", function (req, res) {
  db.collection('objects').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})