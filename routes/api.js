/**
 * 	データ操作用APIを提供する
 * 	http://~/api/~ に定義
 */

var express = require('express');
var router = express.Router();
var setting = require('../modules/setting.js');
var dbModule = require('../modules/DBModule')();
var loginCheckModule = require("../modules/LoginCheckModule");
var ACDModule = require('../modules/ACDModule');
var CTRModule = require('../modules/CTRModule');

/*
	API for common user
	ユーザが利用するAPI 基本的にサービス内で利用する
	セッションデータを必ずクエリに入れるため、対象は自身のデータに絞られる
 */

router.get('/', loginCheckModule.apikeyCheck, function(req, res, next) {
	var apikey = req.body.apikey || req.query.apikey || req.session.user.apikey;
  	
  	res.json({data:"can't use this url "});
});


/**
 * 	deplicate
 * 	sessionを生成する	                                                                                                                    [description]
 */
router.get('/login', loginCheckModule.apikeyCheck, function(req, res, next){
	var userId = req.query.userId;
	var password = req.query.password;
	var loginQuery = {'$and' : [{userId:userId},{password:password}]};

	dbModule.find('Password',loginQuery,{},function(passwordDatas){
		if(passwordDatas.length != 0){
			dbModule.find('User',{userId:userId},{},function(userDatas){
				var userData = userDatas[0];
				console.log(userData);
				var session = {
					id : userId,
					name : userData.userName,
					apikey : passwordDatas[0].apikey
				};
				req.session.user = session;
				res.json(session);
			});
		}else{
			// 見つからなければ注意
			res.render({err:"Failed to login."})
		}
	});
});

/**
 * 実行中のToDoListを返却する
 * @param  {[type]} req       [description]
 * @param  {[type]} res       [description]
 * @param  {[type]} next){} [description]
 * @return {[type]}           [description]
 */
router.get('/todo/incomplete', loginCheckModule.apikeyCheck, function(req, res, next){
	var apikey = req.body.apikey || req.query.apikey || req.session.user.apikey;
	ACDModule.getUserId(apikey, function(userIdObj){
		if(userIdObj.userId){
			ACDModule.getAllData(userIdObj.userId, function(datas){

				var todoList = [];
				datas.allData.project.map(function(proElm, proInd, proArr){
					todoList = todoList.concat(proElm.todoList);
					return true;
				});

				var reTodoList = todoList.filter(function(elm, ind, arr){
					return !(elm.completion);
				});
				res.json({userData:datas.userData, todoList:reTodoList})

			});
		}else{
			res.json(userIdObj);
		}
	});
});

router.get('/todo/complete', loginCheckModule.apikeyCheck, function(req, res, next){
  	var apikey = req.body.apikey || req.query.apikey || req.session.user.apikey;
	ACDModule.getUserId(apikey, function(userIdObj){
		if(userIdObj.userId){
			ACDModule.getAllData(userIdObj.userId, function(datas){

				var todoList = [];
				datas.allData.project.map(function(proElm, proInd, proArr){
					todoList = todoList.concat(proElm.todoList);
					return true;
				});

				var reTodoList = todoList.filter(function(elm, ind, arr){
					return elm.completion;
				});
				res.json({userData:datas.userData, todoList:reTodoList})

			});
		}else{
			res.json(userIdObj);
		}
	});
});

router.get('/todo/all', loginCheckModule.apikeyCheck, function(req, res, next){
	var apikey = req.body.apikey || req.query.apikey || req.session.user.apikey;
	ACDModule.getUserId(apikey, function(userIdObj){
		if(userIdObj.userId){
			ACDModule.getAllData(userIdObj.userId, function(datas){

				var todoList = [];
				datas.allData.project.map(function(proElm, proInd, proArr){
					todoList = todoList.concat(proElm.todoList);
					return true;
				});
				res.json({userData:datas.userData, todoList:todoList})

			});
		}else{
			res.json(userIdObj);
		}
	});
});

router.get('/todo/detail', loginCheckModule.apikeyCheck, function(req, res, next){
  	var apikey = req.body.apikey || req.query.apikey || req.session.user.apikey;
	ACDModule.getUserId(apikey, function(userIdObj){
		if(userIdObj.userid){
			ACDModule.getToDoList(req.query.query, function(todoListDatas){
				res.json({todoList:todoListDatas});
			});
		}else{
			res.json(userIdObj);
		}
	});
});

router.get('/project/incomplete', loginCheckModule.apikeyCheck, function(req, res, next){
  	res.json({data:"can't use this url "});

});

router.get('/project/complete', loginCheckModule.apikeyCheck, function(req, res, next){
  	res.json({data:"can't use this url "});

});

router.get('/project/all', loginCheckModule.apikeyCheck, function(req, res, next){
  	res.json({data:"can't use this url "});

});

router.get('/project/detail', loginCheckModule.apikeyCheck, function(req, res, next){
  	res.json({data:"can't use this url "});

});

router.get('/userData', loginCheckModule.apikeyCheck, function(req, res, next){
	var apikey = req.body.apikey || req.query.apikey || req.session.user.apikey;
	ACDModule.getUserId(apikey, function(userIdObj){
		if(userIdObj.userId){
			ACDModule.getAllData(userIdObj.userId, function(datas){
				res.json({userData:datas.userData, allData:datas.allData});
			});
		}else{
			res.json(userIdObj);
		}
	});
});

router.get('/userData/incomplete', loginCheckModule.apikeyCheck, function(req, res, next){
	var apikey = req.body.apikey || req.query.apikey || req.session.user.apikey;
	ACDModule.getUserId(apikey, function(userIdObj){
		if(userIdObj.userId){
			ACDModule.getAllData(userIdObj.userId, function(datas){
				console.log(datas)
				var sendObj = Object.assign({}, datas.allData);
				sendObj.project = sendObj.project.filter(function(elm, ind, arr){
					return !(elm.completion);
				}).map(function(pelm, pind, parr){
					var project = Object.assign({}, pelm);
					project.todoList = project.todoList.filter(function(telm, tind, tarr){
						return !(telm.completion)
					});
					return project
				});
				res.json({userData:datas.userData, allData:sendObj});
			});
		}else{
			res.json(userIdObj);
		}
	});
});

router.post('/todo/insert', loginCheckModule.apikeyCheck, function(req, res, next){
	var apikey = req.body.apikey || req.query.apikey || req.session.user.apikey;
	ACDModule.getUserId(apikey, function(userIdObj){
		var insertData = Object.assign({}, req.body);
		console.log(insertData);
		insertData.userData = userIdObj;
		insertData.tag = insertData.tag || []
		ACDModule.insertToDo(insertData, function(){
			res.json({success:true});
		});
	});
});

router.post('/todo/upsert', loginCheckModule.apikeyCheck, function(req, res, next){
	var apikey = req.body.apikey || req.query.apikey || req.session.user.apikey;
	ACDModule.getUserId(apikey, function(userIdObj){
		// var insertData = Object.assign({}, req.body);
		// console.log(insertData);
		// insertData.userData = userIdObj;
		// insertData.tag = insertData.tag || []
		// ACDModule.insertToDo(insertData, function(){
		// 	res.json({success:true});
		// });
	});
});

router.post('/project/insert', loginCheckModule.apikeyCheck, function(req, res, next){
	var apikey = req.body.apikey || req.query.apikey || req.session.user.apikey;
	ACDModule.getUserId(apikey, function(userIdObj){
		var insertData = Object.assign({}, req.body);
		console.log(insertData);
		insertData.userId = userIdObj.userId;
		ACDModule.insertProject(insertData, function(){
			res.json({success:true});
		});
	});
});

router.post('/project/upsert', loginCheckModule.apikeyCheck, function(req, res, next){

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
