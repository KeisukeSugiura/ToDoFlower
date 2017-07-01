var express = require('express');
var router = express.Router();
var dbModule = require("../modules/DBModule")();
var loginCheckModule = require("../modules/LoginCheckModule");
var ACDModule = require('../modules/ACDModule');
var CTRModule = require('../modules/CTRModule');


/**
 *  GET Request for /user/*  
 *  require title and userName
 */

router.get('/', loginCheckModule.loginCheck, function(req, res, next) {
 	res.render('user',{title:"ToDoFlower", userName:req.session.user.name});
});

router.get('/menu', loginCheckModule.loginCheck, function(req, res, next){
	res.render('user_menu',{title:"ToDoFlower", userName:req.session.user.name, apikey:req.session.user.apikey, id:req.session.user.id});
});


module.exports = router;
