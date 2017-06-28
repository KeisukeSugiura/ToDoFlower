var express = require('express');
var router = express.Router();
var dbModule = require("../modules/DBModule")();
var loginCheckModule = require("../modules/LoginCheckModule");

/* GET users listing. */
router.get('/', loginCheckModule.loginCheck, function(req, res, next) {
  res.render('todo',{title:"users"});
});

router.get('/todo', loginCheckModule.loginCheck, function(req,res,next){
	res.render('todo',{title: 'TODOFlower todo'});
})

router.get('/search', loginCheckModule.loginCheck, function(req,res,next){
	res.render('search',{title: 'TODOFlower search'});
})

router.get('/detail', loginCheckModule.loginCheck, function(req,res,next){
	res.render('detail',{title: 'TODOFlower detail'});
})

module.exports = router;
