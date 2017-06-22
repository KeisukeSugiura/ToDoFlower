/**
 * Passwordモデルの定義、CRUDメソッドの提供
 * @param {mongoose} mongoose [mongoDBのラッパー]
 */
var PasswordDB = function(mongoose){
	var Schema = mongoose.Schema;

	var SchemaData = {
		userId : {type : String, default : "", conv : function(str){return String(str);}},
		password : {type : String, default : "", conv : function(str){return String(str);}}
	}

	var PasswordSchema = new Schema(SchemaData);

	var Password = mongoose.model('Password', PasswordSchema);

	function find(query, option, callback){
		query = query || {};
		option = option || {};
		callback = callback || function(){};
		Password.find(query, option, function(err, data) {
            if(err) {
            	console.log(err);
        	}else{
            	callback(data);
        	}
        });
	}

	function insert(datas, callback){
        callback = callback || function(){};
        var insertData = new Password(datas);
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
        Password.update(query, datas, option, function(err) {
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
		Password.remove(query, function(err, data) {
            if(err) {
            	console.log(err);
            }else{
	            callback(data);
            }
        });
	}


	return {
		schema : SchemaData,
		model : Password,
		find : find,
		insert : insert,
		upsert : upsert,
		remove : remove
	}

}


module.exports = PasswordDB;
