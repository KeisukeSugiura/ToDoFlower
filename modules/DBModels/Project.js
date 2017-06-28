/**
 * Projectモデルの定義、CRUDメソッドの提供
 * @param {mongoose} mongoose [mongoDBのラッパー]
 */
var ProjectDB = function(mongoose){
	var Schema = mongoose.Schema;

	var SchemaData = {
		projectId : {type : String, default : "", conv : function(str){return String(str);}},
		projectName : {type : String, default : "", conv : function(str){return String(str);}},
		projectDetail : {type : String, default : "", conf : function(str){return String(str);}},
		projectColor : {type : String, default : "ffffff", conf : function(str){
			var checker = str.replace(/0*1*2*3*4*5*6*7*8*9*a*b*c*d*e*f*/g,"");
			if(str.length == 6 && checker == ""){
				return String(str);
			}else{
				return "ffffff"
			}
		}},
		projectOwnerId : {type : String, default : "", conf : function(str){return String(str);}},
		completion : {type : Boolean, default : false, conv : function(str){
			if(str == 'true'){
				return true;
			}else{
				return false;
			}
		}}
	}

	var ProjectSchema = new Schema(SchemaData);

	var Project = mongoose.model('Project', ProjectSchema);

	function find(query, option, callback){
		query = query || {};
		option = option || {};
		callback = callback || function(){};
		Project.find(query, option, function(err, data) {
            if(err) {
            	console.log(err);
        	}else{
            	callback(data);
        	}
        });
	}

	function insert(datas, callback){
        callback = callback || function(){};
        var insertData = new Project(datas);
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
        Project.update(query, datas, option, function(err) {
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
		Project.remove(query, function(err, data) {
            if(err) {
            	console.log(err);
            }else{
	            callback(data);
            }
        });
	}


	return {
		schema : SchemaData,
		model : Project,
		find : find,
		insert : insert,
		upsert : upsert,
		remove : remove
	}

}


module.exports = ProjectDB;
