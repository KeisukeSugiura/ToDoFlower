/**
 * DBModule
 * データベース利用のためのラッパーモジュール
 * Singletonパターン
 */
function DBModule(){
	
	var self = this;
	
    function init(){
    	var mongoose = require('mongoose');
	    var setting = require('./setting');

	    databases = {};

	    databases.Password = require("./DBModels/password")(mongoose);
	    databases.ToDoList = require("./DBModels/ToDoList")(mongoose);
	   	databases.ToDoListTag = require("./DBModels/ToDoListTag")(mongoose);
	   	databases.User = require("./DBModels/User")(mongoose);

	    mongoose.connect(setting.DATABASE_URL);

	    function find(dbName, query, option, callback){
	    	console.log("find : " + dbName);
	        databases[dbName].find(query, option, callback);
	    }

	    function insert(dbName, datas, callback){
	    	console.log("insert : " + dbName);
	    	databases[dbName].insert(datas, callback);
	    }

	    function upsert(dbName, query, datas, option, callback){
	    	console.log("upsert : " + dbName);
	    	databases[dbName].upsert(query, datas, option, callback);
	    }

	    function remove(dbName, query, option, callback){
	    	console.log("delete : " + dbName);
	    	databases[dbName].remove(query, option, callback);
	    }

	    function getSchema(dbName, callback){
	    	var schema = databases[dbName].schema
	    	console.log("schema : " + schema);
	    	callback(schema);
	    }

	    function getModel(dbname, callback){
	    	var model = databases[dbName].model;
	    	callback(model);
	    }

	    return {
	    	find : find,
	    	insert : insert,
	    	upsert : upsert,
	    	remove : remove,
	    	getSchema : getSchema,
	    	getModel : getModel,
	    	databases : databases
	    }
    }

    if(self.instance){
    	console.log("DBModule instance has been");
    	return self.instance;
    }else{
    	self.instance = init();
    	return self.instance;
    }


}

module.exports = DBModule;