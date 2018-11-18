var express = require('express');
var router = express.Router();

var db = 'test';
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/' + db);

var Schema = mongoose.Schema;

var userDataSchema = new Schema({
  name: {type: String, required: true},
  position: String,
  age: Number
}, {collection: 'users'});


var UserData = mongoose.model('UserData', userDataSchema);


router.get('/', (req, res, next) => {
  UserData.find()
    .then(function(doc) {
        res.render('index', {items: doc, collection: 'users', lenght: doc.length, keys: Object.keys(userDataSchema.obj)});
    });
});


router.post('/insert', (req, res, next) => {
  var item = {
    name: req.body.name,
    position: req.body.position,
    age: req.body.age
  }
  var data = new UserData(item);
  data.save();

  res.redirect('/database');
});


router.post('/update', function(req, res, next) {
    if (req.body.id) next();
    else {
      console.log("input /:id");
      res.redirect('/database');
    }
  }, function(req, res, next) {
  var id = req.body.id;

  UserData.findById(id, function(err, doc) {
    if (err) console.error('error, no entry found');

    doc.name = req.body.name ? req.body.name : doc.name;
    doc.position = req.body.position ? req.body.position : doc.position;
    doc.age = req.body.age ? req.body.age : doc.age;
    doc.save();
  })

  res.redirect('/database');
});

router.get('/delete/:id', function(req, res, next) {
  var id = req.params.id;
  UserData.findByIdAndRemove(id).exec();
  res.redirect('/database');
});

router.get('/', (req, res, next) => {
  res.render('index');
})

module.exports = router;
