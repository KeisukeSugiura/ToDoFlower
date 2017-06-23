/**
 * ToDoListモデルの定義、CRUDメソッドの提供
 * @param {mongoose} mongoose [mongoDBのラッパー]
 */
var ToDoListDB = function(mongoose){
	var Schema = mongoose.Schema;

	var SchemaData = {
		todoId : {type : String, default : "", conv : function(str){return String(str);}},
		publisherId : {type : String, default : "", conv : function(str){return String(str);}},
		executorId : {type : String, default : "", conv : function(str){return String(str);}},
		inputTime : {type : Date, default : new Date(), conv : function(str){return new Date(str);}},
		limitTime : {type : Date, default : new Date(), conv : function(str){return new Date(str);}},
		endTime : {type : Date, default : new Date(), conv : function(str){return new Date(str);}},
		title : {type : String, default : "", conv : function(str){return String(str);}},
		priority : {type : Number, default : 0, conv : function(str){return Number(str);}},
		completion : {type : Boolean, default : false, conv : function(str){
			if(str == 'true'){
				return true;
			}else{
				return false;
			}
		}}
	}

	var ToDoListSchema = new Schema(SchemaData);

	var ToDoList = mongoose.model('ToDoList', ToDoListSchema);

	function find(query, option, callback){
		query = query || {};
		option = option || {};
		callback = callback || function(){};
		ToDoList.find(query, option, function(err, data) {
            if(err) {
            	console.log(err);
        	}else{
            	callback(data);
        	}
        });
	}

	function insert(datas, callback){
        callback = callback || function(){};
        var insertData = new ToDoList(datas);
        insertData.save(function(err) {
            if(err){
                console.log(err);
            }else{
	            callback();
            }
        });
	}

	function upsert(query, datas, option, callback){
		query = query || {};
		option = option || {};
		callback = callback || function(){};
		option.upsert = true;
        ToDoList.update(query, datas, option, function(err) {
          	if(err){
          		console.log(err);
          	}else{
	            callback();
          	}
        });
	}

	function remove(query, option, callback){
		query = query || {};
		option = option || {};
		callback = callback || function(){};
		ToDoList.remove(query, function(err, data) {
            if(err) {
            	console.log(err);
            }else{
	            callback(data);
            }
        });
	}


	return {
		schema : SchemaData,
		model : ToDoList,
		find : find,
		insert : insert,
		upsert : upsert,
		remove : remove
	}

}


module.exports = ToDoListDB;
