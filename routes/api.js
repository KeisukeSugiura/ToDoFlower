/**
 * 	データ操作用APIを提供する
 * 	http://~/api/~ に定義
 */

var express = require('express');
var router = express.Router();
var setting = require('../modules/setting.js');
var dbModule = require('../modules/DBModule')();

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


/*
	control database methods
	単純なデータ挿入に利用する
 */
var CTRModule = (function(){
	function find(req,res,dbName){
	  	var request = [];
	  	var req_keys = Object.keys(req.query);
	  	req_keys.forEach(function(elm,index,arr){
	 	   var q = {};
	 	   q[elm] = req.query[elm];
	 	   request.push(q);
	 	 });

		  if(request.length == 0){
		    var query = {};
		  }else{
		    var query = {'$and':request};  
		  }

		  dbModule.find(dbName,query,{},function(result){
		    dbModule.getSchema(dbName,function(schema){
		      var sendObject = {};
		      sendObject.datas = result;
		      sendObject.schema = schema;
		      res.json(sendObject);
	    });
	  });
	}

	function insert(req,res,dbName){
	    dbModule.getSchema(dbName,function(schema){
	      var insertItem = {};
	      // if(dbName=='password'){
	      //   req.body.password = sechash.strongHashSync(req.body.password,setting.hash_opts);
	      // }
	      var keys = Object.keys(schema);
	      keys.forEach(function(elm,index,arr){
	        console.log(elm);
	        insertItem[elm] = req.body[elm] || schema[elm].default;
	      });
	      dbModule.insert(dbName,insertItem,function(){
	          res.send(req.body);
	      });
	    });
	}

	function upsert(req,res,dbName){
	    dbModule.getSchema(dbName,function(schema){
	      // if(dbName=='password'){
	      //   req.body.password = sechash.strongHashSync(req.body.password,setting.hash_opts);
	      // }
	      var upsertItem = {};
	      var schema_keys = Object.keys(schema);
	      schema_keys.forEach(function(elm,index,arr){
	        upsertItem[elm] = schema[elm].conv(req.body[elm]) || schema[elm].type(req.body[elm]) || schema[elm].default;
	        console.log(req.body[elm]);
	        console.log(schema[elm].type(req.body[elm]));
	      });
	      dbModule.upsert(dbName,{_id:req.body._id},upsertItem,{},function(result){
	        res.send(req.body);
	      });
	   });
	}

	function remove(req,res,dbName){
	  	dbModule.remove(dbName,{_id:req.body._id},{},function(result){
	     	 res.send(req.body);
	  	});
	}

	return {
		find : find,
		insert : insert,
		upsert : upsert,
		remove : remove
	}

})();


module.exports = router;
