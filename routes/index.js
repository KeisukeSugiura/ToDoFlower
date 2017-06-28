// render gui

var express = require('express');
var router = express.Router();
var dbModule = require("../modules/DBModule")();
var loginCheckModule = require("../modules/LoginCheckModule");


/**
 * 	GET Request
 */

router.get('/', loginCheckModule.loginCheckHome, function(req, res, next){
	res.render('index', {title: 'ToDoFlower'});
});

router.get('/signup', loginCheckModule.loginCheckHome, function(req, res, next){
	res.render('signup', {title: 'Signup'});
});

router.get('/login', loginCheckModule.loginCheckHome, function(req, res, next){
	res.render('login', {title: 'Login'});
});

router.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/');
});




/**
 * 	POST Request
 */

router.post('/login', loginCheckModule.loginCheckHome, function(req, res, next){
	console.log(req.body);
	var userId = req.body.userId;
	var password = req.body.password;
	var loginQuery = {'$and' : [{userId:userId},{password:password}]};

	dbModule.find('Password',loginQuery,{},function(passwordDatas){
		if(passwordDatas.length != 0){
			dbModule.find('User',{userId:userId},{},function(userDatas){
				var userData = userDatas[0];
				console.log(userData);
				var session = {
					id : userId,
					name : userData.userName
				};
				req.session.user = session;
				res.redirect('/users');
			});
		}else{
			// 見つからなければ注意
			res.render('login',{title:'Login', err:'The login attempt failed. Either the user ID or password is invalid.'})
		}
	});
});

router.post('/signup', loginCheckModule.loginCheckHome, function(req, res, next){
	console.log(req.body);
	var userId = req.body.userId;
	var userName = req.body.userName;
	var password = req.body.password;

	console.log(dbModule);
	dbModule.find('Password',{userId:userId},{},function(userDatas){
			console.log(userDatas);

		if(userDatas.length != 0){
			// すでにuseridがあれば注意
			res.render('signup',{title:'Signup', err:'Sorry, "'+userId+'" is already used.'})
		}else{
			// 登録
			
		}
	});
});

module.exports = router;
