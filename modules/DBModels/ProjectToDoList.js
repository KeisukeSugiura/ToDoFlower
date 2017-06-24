/**
 * ProjectToDoListモデルの定義、CRUDメソッドの提供
 * @param {mongoose} mongoose [mongoDBのラッパー]
 */
var ProjectToDoListDB = function(mongoose){
	var Schema = mongoose.Schema;

	var SchemaData = {
		projectId : {type : String, default : "", conv : function(str){return String(str);}},
		todoId : {type : String, default : "", conv : function(str){return String(str);}}
	}

	var ProjectToDoListSchema = new Schema(SchemaData);

	var ProjectToDoList = mongoose.model('ProjectToDoList', ProjectToDoListSchema);

	function find(query, option, callback){
		query = query || {};
		option = option || {};
		callback = callback || function(){};
		ProjectToDoList.find(query, option, function(err, data) {
            if(err) {
            	console.log(err);
        	}else{
            	callback(data);
        	}
        });
	}

	function insert(datas, callback){
        callback = callback || function(){};
        var insertData = new ProjectToDoList(datas);
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
        ProjectToDoList.update(query, datas, option, function(err) {
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
		ProjectToDoList.remove(query, function(err, data) {
            if(err) {
            	console.log(err);
            }else{
	            callback(data);
            }
        });
	}


	return {
		schema : SchemaData,
		model : ProjectToDoList,
		find : find,
		insert : insert,
		upsert : upsert,
		remove : remove
	}

}

module.exports = ProjectToDoListDB;
