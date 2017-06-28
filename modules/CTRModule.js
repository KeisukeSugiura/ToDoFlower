var dbModule = require('../modules/DBModule')();

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

module.exports = CTRModule;
