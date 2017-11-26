const express = require('express');
const app = express();

const bodyParser= require('body-parser')
const paginate = require('express-paginate');

var mustacheExpress = require('mustache-express');
app.engine('mustache', mustacheExpress());

app.use(bodyParser.urlencoded({extended: true,limit: '50mb'}))

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.set('views', __dirname + '/website');

app.use(paginate.middleware(10, 50));

const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID;

MongoClient.connect('mongodb://127.0.0.1:27017/museumhack', (err, database) => {
  db = database
  app.listen(3000, function(){})
})

app.get('/', function (req, res) {
  db.collection('objects').count(function(err, count) {
  db.collection('objects').find().limit(req.query.limit).skip(req.skip).toArray(function(err, results) {
      const pageCount = Math.ceil(count / req.query.limit);
      res.render('index.html', {
          results: results,
          count: count,
          pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
       })
    })
  })
})

/* A page about an item in the catalogue */
app.get('/item/:id', function (req, res) {
  var id = new ObjectId(req.params.id)
  db.collection('objects').findOne({_id: id}, function(err, result) {
    // What error checking?
    res.render('item.html', {
        item: result
   })
  })
})

app.post("/", function (req, res) {
  // Reorder the custom fields
  obj = req.body
  custom = {}
  for (n in obj) {
    console.log(n)
    var matches = n.match(/customFieldName(\d+)$/)
    if (matches && matches[1]) {
      custom[obj[n]] = obj["customFieldValue"+matches[1]]
    }
  }
  console.log(custom)
  obj.customFields = custom
  db.collection('objects').save(obj, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.use(express.static('website'))
