/**
 * UserToDoListモデルの定義、CRUDメソッドの提供
 * @param {mongoose} mongoose [mongoDBのラッパー]
 */
var UserToDoListDB = function(mongoose){
	var Schema = mongoose.Schema;

	var SchemaData = {
		userId : {type : String, default : "", conv : function(str){return String(str);}},
		todoId : {type : String, default : "", conv : function(str){return String(str);}}
	}

	var UserToDoListSchema = new Schema(SchemaData);

	var UserToDoList = mongoose.model('UserToDoList', UserToDoListSchema);

	function find(query, option, callback){
		query = query || {};
		option = option || {};
		callback = callback || function(){};
		UserToDoList.find(query, option, function(err, data) {
            if(err) {
            	console.log(err);
        	}else{
            	callback(data);
        	}
        });
	}

	function insert(datas, callback){
        callback = callback || function(){};
        var insertData = new UserToDoList(datas);
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
        UserToDoList.update(query, datas, option, function(err) {
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
		UserToDoList.remove(query, function(err, data) {
            if(err) {
            	console.log(err);
            }else{
	            callback(data);
            }
        });
	}


	return {
		schema : SchemaData,
		model : UserToDoList,
		find : find,
		insert : insert,
		upsert : upsert,
		remove : remove
	}

}


module.exports = UserToDoListDB;
