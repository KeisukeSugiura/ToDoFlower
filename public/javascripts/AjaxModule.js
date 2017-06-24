/*
	AjaxでAPIを利用するためのライブラリ
	require jQuery 
 */
var AjaxModule = (function(){
	

	function ajaxPostModel(url, _dataType,_contentType, _doneFn, _failFn, _alwaysFn){
		return function(data, __doneFn, __failFn, __alwaysFn) {
				    var dataType = _dataType || "text";
				    var contentType = _contentType || "application/x-www-form-urlencoded";
				    var doneFn = _doneFn || __doneFn || function(data){console.log(data)};
				    var failFn = _failFn || __failFn || function(data){console.log(data)};
				    var alwaysFn = _alwaysFn || __alwaysFn || function(data){};

				    $.ajax({
				      url: url,
				      data: data,
				      dataType: dataType,
				      contentType: contentType,
				      type: 'post',
				      timeout: 10000
					})
					   //通信が成功したとき
					   .done(function(data){doneFn(data);})
					   //通信が失敗したとき
					   .fail(function(data){failFn(data);})
					   //通信が終わったとき
					   .always(function(data){alwaysFn(data);});
				};
	}

	function ajaxGetModel(url, _dataType, _doneFn, _failFn, _alwaysFn){
		return function(data, __doneFn, __failFn, __alwaysFn){
					var dataType = _dataType || "text";
					var doneFn = _doneFn || __doneFn || function(data){console.log(data);}
					var failFn = _failFn || __failFn || function(data){console.log(data);}
					var alwaysFn = _alwaysFn || __alwaysFn || function(data){}

					$.ajax({
				      url: url,
				      data: data,
				      dataType: dataType,
				      type: 'get',
				      timeout: 10000,
				     })
				     //通信が成功したとき
				     .done(function(data){doneFn(data);})
				     //通信が失敗したとき
				     .fail(function(data){failFn(data);})
				     //通信が終わったとき
				     .always(function(data){alwaysFn(data);});
		    	};
	}


	/*
		crud api for super user
		url example : /api/User/find, /api/Password/upsert...
		how to use : AjaxModule["dbName"].find(data, successFn, errorFn, doneFn)
	 */
	var modules = {};
	var getKeys = ajaxGetModel('/api/keys', 'json')({}, function(data){
		data.keys.forEach(function(dbName, dbInd, dbArr){
			modules[dbName] = {};
			modules[dbName]['find'] = ajaxGetModel('/api/'+dbName+'/find', 'json');
			['insert', 'upsert', 'remove'].forEach(function(cudName, cudInd, cudArr){
				modules[dbName][cudName] = ajaxPostModel('/api/'+dbName+'/'+cudName, 'json');
			});
		});
	});

	return modules;

})();