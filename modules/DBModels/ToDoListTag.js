/**
 * ToDoListTagモデルの定義、CRUDメソッドの提供
 * @param {mongoose} mongoose [mongoDBのラッパー]
 */
var ToDoListTagDB = function(mongoose){
	var Schema = mongoose.Schema;

	var SchemaData = {
		todoId : {type : String, default : "", conv : function(str){return String(str);}},
		tag : {type : String, default : "", conv : function(str){return String(str);}}
	}

	var ToDoListTagSchema = new Schema(SchemaData);
	var ToDoListTag = mongoose.model("ToDoListTag", ToDoListTagSchema);

	function find(query, option, callback){
		query = query || {};
		option = option || {};
		callback = callback || function(){};
		ToDoListTag.find(query, option, function(err, data) {
            if(err) {
            	console.log(err);
        	}else{
            	callback(data);
        	}
        });
	}

	function insert(datas, callback){
        callback = callback || function(){};
        var insertData = new ToDoListTag(datas);
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
        ToDoListTag.update(query, datas, option, function(err) {
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
		ToDoListTag.remove(query, function(err, data) {
            if(err) {
            	console.log(err);
            }else{
	            callback(data);
            }
        });
	}


	return {
		schema : SchemaData,
		model : ToDoListTag,
		find : find,
		insert : insert,
		upsert : upsert,
		remove : remove
	}

}


module.exports = ToDoListTagDB;
