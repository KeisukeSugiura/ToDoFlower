/**
 * UserProjectモデルの定義、CRUDメソッドの提供
 * @param {mongoose} mongoose [mongoDBのラッパー]
 */
var UserProjectDB = function(mongoose){
	var Schema = mongoose.Schema;

	var SchemaData = {
		userId : {type : String, default : "", conv : function(str){return String(str);}},
		projectId : {type : String, default : "", conv : function(str){return String(str);}}
	}

	var UserProjectSchema = new Schema(SchemaData);

	var UserProject = mongoose.model('UserProject', UserProjectSchema);

	function find(query, option, callback){
		query = query || {};
		option = option || {};
		callback = callback || function(){};
		UserProject.find(query, option, function(err, data) {
            if(err) {
            	console.log(err);
        	}else{
            	callback(data);
        	}
        });
	}

	function insert(datas, callback){
        callback = callback || function(){};
        var insertData = new UserProject(datas);
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
        UserProject.update(query, datas, option, function(err) {
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
		UserProject.remove(query, function(err, data) {
            if(err) {
            	console.log(err);
            }else{
	            callback(data);
            }
        });
	}


	return {
		schema : SchemaData,
		model : UserProject,
		find : find,
		insert : insert,
		upsert : upsert,
		remove : remove
	}

}


module.exports = ProjectToDoListDB;
