/*
	actually control database module
	アプリケーションにおける実際の操作に関するメソッド群
 */
var dbModule = require('../modules/DBModule')();

var ACDModule = (function(){

	function convertArrayToObject(arr, elementName){
		var convertObject = new Object();
		arr.forEach(function(elm){
			convertObject[elm[elementName]] = elm;
		});
		return convertObject;
	}

	/**
	 * 特定のユーザが保持するデータを整形して返却するメソッドcallback(datas)
	 * @return {allData, userData, projectData, todoListData}
	 */
	function getUserData(userId, callback){
		/*
			特定のユーザが保持するデータを整形して返却するメソッド
			user : {
				userId,
				userName
				project : [
					{
						projectId,
						projectName,
						...,
						todoList : [{
							todoId,
							todoName,
							...,
							tag : [
								{tag : "1"},
								{tag : "2"},
								...
							]
						}]
					},
					...,
				]
			}
		 */
		//var userId = req.session.userId;
		//var userName = req.session.userName;

		dbModule.find('User', {'userId': userId}, {}, function(userData){
			if(userData.length != 0){
				dbModule.find('UserProject', {'userId' : userId}, {}, function(projectIdList){
					var projectQueryOrArray = projectIdList.map(function(elm, ind, arr){
						return {'projectId' : elm.projectId};
					});
					var projectQuery = {'$or' : projectQueryOrArray};

					dbModule.find('Project', projectQuery, {}, function(projectDatas){

						dbModule.find('ProjectToDoList', projectQuery, {}, function(todoListIdList){
							
							var todoQueryOrArray = todoListIdList.map(function(elm, ind, arr){
								return {'todoId' : elm.todoId};
							});

							var todoQuery = {'$or' : todoQueryOrArray};

							dbModule.find('ToDoList', todoQuery, {}, function(todoListDatas){
								dbModule.find('ToDoListTag', todoQuery, {}, function(todoListTagDatas){

									var userObj = userData.map(function(userElm){
										var reUserElm = Object.assign({}, userElm._doc);
										reUserElm.project = projectDatas.map(function(projectElm){
											var reProjectElm = Object.assign({}, projectElm._doc);
											reProjectElm.todoList = todoListIdList.map(function(todoIdElm){

												var todoList = todoListDatas.filter(function(todoElm){
													
													return todoElm.todoId == todoIdElm.todoId;
												
												}).map(function(todoElm){
													var reTodoElm = Object.assign({},todoElm._doc);
													reTodoElm.tag = todoListTagDatas.filter(function(tagElm){
														return tagElm.todoId == todoElm.todoId;
													});
													return reTodoElm;
												});
												return todoList;
											});

											return reProjectElm;
										});

										return reUserElm;
									});

									callback({allData:userObj, userData:userData, projectData:projectDatas, todoListData:todoListDatas});
								}); // ToDoListTag
							}); // ToDoList
						}); // ProjectToDoList
					}); // Project
				}); // UserProject
			}else{
				console.log("can't find user data");
				callback({});
			}
		}); // User
	}

	return {
		getUserData : getUserData,
		convertArrayToObject : convertArrayToObject
	};

})();

module.exports = ACDModule;