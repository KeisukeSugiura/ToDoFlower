/**
 * Userモデルの定義、CRUDメソッドの提供
 * @param {mongoose} mongoose [mongoDBのラッパー]
 */
var UserDB = function(mongoose){
	var Schema = mongoose.Schema;

	var SchemaData = {
		userId : {type : String, default : "", conv : function(str){return String(str);}},
		userName : {type : String, default : "", conv : function(str){return String(str);}}
	}

	var UserSchema = new Schema(SchemaData);

	var User = mongoose.model('User', UserSchema);

	function find(query, option, callback){
		query = query || {};
		option = option || {};
		callback = callback || function(){};
		User.find(query, option, function(err, data) {
            if(err) {
            	console.log(err);
        	}else{
            	callback(data);
        	}
        });
	}

	function insert(datas, callback){
        callback = callback || function(){};
        var insertData = new User(datas);
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
        User.update(query, datas, option, function(err) {
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
		User.remove(query, function(err, data) {
            if(err) {
            	console.log(err);
            }else{
	            callback(data);
            }
        });
	}


	return {
		schema : SchemaData,
		model : User,
		find : find,
		insert : insert,
		upsert : upsert,
		remove : remove
	}

}


module.exports = UserDB;