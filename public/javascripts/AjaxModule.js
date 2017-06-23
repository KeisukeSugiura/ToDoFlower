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
	}

	var modules = {};
	modules.Password = {};
	modules.ToDoList = {};
	modules.ToDoListTag = {};
	modules.User = {};

	modules.Password.find = ajaxGetModel('/api/Pasword/find', 'json');
	modules.Password.insert = ajaxPostModel('/api/Password/insert', 'json', 'application/json');
	modules.Password.upsert = ajaxPostModel('/api/Password/find', 'json', 'application/json');
	modules.Password.remove = ajaxPostModel('/api/Password/remove', 'json', 'application/json');

	modules.ToDoList.find = ajaxGetModel('/api/TodoList/find', 'json');
	modules.ToDoList.insert = ajaxPostModel('/api/ToDoList/insert', 'json', 'application/json');
	modules.ToDoList.upsert = ajaxPostModel('/api/ToDoList/upsert', 'json', 'application/json');
	modules.ToDoList.remove = ajaxPostModel('/api/ToDoList/remove', 'json', 'application/json');

	modules.ToDoListTag.find = ajaxGetModel('/api/ToDoListTag/find', 'json');
	modules.ToDoListTag.insert = ajaxPostModel('/api/ToDoListTag/insert', 'json');
	modules.ToDoListTag.upsert = ajaxPostModel('/api/ToDoListTag/upsert', 'json');
	modules.ToDoListTag.remove = ajaxPostModel('/api/ToDoListTag/remove', 'json');

	modules.User.find = ajaxGetModel('/api/User/find', 'json');
	modules.User.insert = ajaxPostModel('/api/User/insert', 'json', 'application/json');
	modules.User.upsert = ajaxPostModel('/api/User/upsert', 'json', 'application/json');
	modules.User.remove = ajaxPostModel('/api/User/remove', 'json', 'application/json');


	return modules;

})();