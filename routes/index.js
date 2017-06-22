// render gui

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/todo', function(req,res,next){
	res.render('todo',{title: 'TODOFlower todo'});
})

router.get('/search', function(req,res,next){
	res.render('search',{title: 'TODOFlower search'});
})

router.get('/detail', function(req,res,next){
	res.render('detail',{title: 'TODOFlower detail'});
})

module.exports = router;
