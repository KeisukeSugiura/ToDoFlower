/**
 * 	データ操作用APIを提供する
 * 	http://~/api/~ に定義
 */

var express = require('express');
var router = express.Router();
var setting = require('../modules/setting.js');
var dbModule = require('../modules/DBModule')();
var ACDModule = require('../modules/ACDModule');
var CTRModule = require('../modules/CTRModule');

/*
	API for common user
	ユーザが利用するAPI 基本的にサービス内で利用する
	ユーザデータを必ずクエリに入れるため、対象は自身のデータに絞られる
 */

router.get('/', function(req, res, next) {
  res.json({data:"can't use this url "});
});

router.get('/todo', function(req, res, next) {
	// get user data with query
	// {userId, session...}
  res.json({data:"can't use this url"});
});

router.get('/search', function(req, res, next) {
	// get user data with query
	// {userId, query, session...}
  res.json({data:"can't use this url"});
});

/**
 * 実行中のToDoListを返却する
 * @param  {[type]} req       [description]
 * @param  {[type]} res       [description]
 * @param  {[type]} next){} [description]
 * @return {[type]}           [description]
 */
router.get('/todo/incomplete', function(req, res, next){
	/*
		ToDoListにprojectColorを乗っけたデータが欲しい
		{
			todoList : [
				{
					ToDoList + projectColor
				},
				{
					ToDoList + projectColor
				}
	
			],
			userData : {
				User
			}
		}
	 */
	var userId = req.session.userId;
	var userName = req.session.userName;
	ACDModule.getUserData(req, function(datas){
		var reTodoList = datas.todoListData.filter(function(elm, ind, arr){
			return !elm.completion;
		}).map(function(elm, ind, arr){
			var reObject = Object.assign({}, elm._doc);
		});

		res.json({userData:data.userData, todoList:reTodoList});
	});
});

router.get('/todo/complete', function(req, res, next){

});

router.get('/todo/all', function(req, res, next){

});

router.get('/todo/one', function(req, res, next){

});

router.get('/project/incomplete', function(req, res, next){

});

router.get('/project/complete', function(req, res, next){

});

router.get('/project/all', function(req, res, next){

});

router.get('/project/one', function(req, res, next){

});

router.get('/userData',function(req, res, next){

});

router.get('/userAlldata', function(req, res, next){
	var userId = req.session.userId;
	if(userId){
		ACDModule.getUserData(req.session.userId, function(data){
			res.json(data);
		});	
	}else{
		res.json({});
	}
	
});

router.get('/test', function(req, res, next){
	var userId = 'user1';
	ACDModule.getUserData(req.session.userId, function(data){
		console.log(data);
		res.json(data);
	});
});



/*
	API for super user
	システム管理者用API 基本的にデバッグに利用する 
	ユーザデータをクエリに入れないため、対象は全データになる
 */

router.get('/super/gui', function(req,res,next){
	var dbList = [];
	Object.keys(dbModule.databases).forEach(function(elm, ind, arr){
		dbList.push(elm);
	});

	res.render('super',{title:"Super", dbList:dbList});
});

router.get('/keys', function(req, res, next){
	res.json({keys : Object.keys(dbModule.databases)});
});



/**
 * /api/~ に各データベースのCRUD APIを提供
 */
Object.keys(dbModule.databases).forEach(function(dbName, dbInd, dbArr){
	
	router.get('/'+dbName+'/find', function(req, res, next){
		CTRModule['find'](req, res, dbName);
	});

	['insert', 'upsert', 'remove'].forEach(function(cudName, cudInd, cudArr){
		router.post('/'+dbName+'/'+cudName, function(req, res, next){
			CTRModule[cudName](req, res, dbName);
		});
	});

});








module.exports = router;
