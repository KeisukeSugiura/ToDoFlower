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

	function generateUniqueId(){
		return Math.random().toString(36).slice(-8);
	}

	/**
	 * apikeyからユーザidを取得する
	 * @return {[type]}            [description]
	 */
	function getUserId(apikey, callback){
		dbModule.find('Password', {apikey:apikey}, {}, function(userDatas){
			if(userDatas.length != 0){
				var userData = userDatas[0];
				callback({userId:userData.userId});
			}else{
				callback({err:"Failed to get user with this apikey."})
			}
		})
	}

	/**
	 * todoIdでtodolistを検索して返却する
	 */
	function getToDoListWithId(todoId, callback){
		//projecttodolist -> project[0]
		
		dbModule.find('ProjectToDoList', {todoId:todoId}, {}, function(todoListIdList){
			if(todoListIdList.length != 0){

				dbModule.find('Project', {projectId:todoListIdList[0].projectId}, {}, function(projectDatas){
					var projectElm = projectDatas[0];
					dbModule.find('ToDoList', {todoId:todoId}, {}, function(todoListDatas){
						dbModule.find('ToDoListTag', todoQuery, {}, function(todoListTagDatas){

							var todoItem = todoListDatas[0];
							var reTodoItem = Object.assign({}, todoItem._doc);
							reTodoItem.tag = todoListTagDatas.filter(function(tagElm){
								return tagElm.todoId == todoItem.todoId;
							});
							reTodoItem.projectColor = projectElm.projectColor;
							reTodoItem.projectName = projectElm.projectName;
							reTodoItem.projectId = projectElm.projectId;

							callback({allData:userObj[0], userData:userData[0], projectData:projectDatas, todoListData:todoListDatas});
						}); // ToDoListTag
					}); // ToDoList
				});// Project
			}else{
				callback({err:"Faild to find todoList data."})
			}
		}); // ProjectToDoList
	}

	/**
	 * projectIdでprojectを検索して返却する
	 */
	function getProjectWithId(projectId, callback){
		dbModule.find('Project', {projectId:projectId}, {}, function(projectDatas){

			dbModule.find('ProjectToDoList', {projectId:projectId}, {}, function(todoListIdList){
				
				var todoQueryOrArray = todoListIdList.map(function(elm, ind, arr){
					return {'todoId' : elm.todoId};
				});

				var todoQuery = {'$or' : todoQueryOrArray};

				dbModule.find('ToDoList', todoQuery, {}, function(todoListDatas){
					dbModule.find('ToDoListTag', todoQuery, {}, function(todoListTagDatas){
						var reProject = projectDatas.map(function(projectElm){
							var reProjectElm = Object.assign({}, projectElm._doc);
							reProjectElm.todoList = todoListIdList.filter(function(todoIdElm){

								return todoIdElm.projectId == projectElm.projectId;

							}).map(function(todoIdElm){

								// todoIdはuidなので一つしか当てはまらない
								var todoItem = todoListDatas.filter(function(todoElm){
									return todoElm.todoId == todoIdElm.todoId;
								})[0];
								var reTodoItem = Object.assign({}, todoItem._doc);
								reTodoItem.tag = todoListTagDatas.filter(function(tagElm){
									return tagElm.todoId == todoItem.todoId;
								});
								reTodoItem.projectColor = projectElm.projectColor;
								reTodoItem.projectName = projectElm.projectName;
								reTodoItem.projectId = projectElm.projectId;

								return reTodoItem;
							});

							return reProjectElm;
						});

						callback({projectData:reProject});
					}); // ToDoListTag
				}); // ToDoList
			}); // ProjectToDoList
		}); // Project
	}

	/**
	 * 特定のユーザが保持するデータを整形して返却するメソッドcallback(datas)
	 * @return {allData, userData, projectData, todoListData}
	 */
	function getAllData(userId, callback){
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

		dbModule.find('User', {'userId': userId}, {}, function(userData){
			if(userData.length == 1){
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
											reProjectElm.todoList = todoListIdList.filter(function(todoIdElm){

												return todoIdElm.projectId == projectElm.projectId;

											}).map(function(todoIdElm){

												// todoIdはuidなので一つしか当てはまらない
												var todoItem = todoListDatas.filter(function(todoElm){
													return todoElm.todoId == todoIdElm.todoId;
												})[0];
												var reTodoItem = Object.assign({}, todoItem._doc);
												reTodoItem.tag = todoListTagDatas.filter(function(tagElm){
													return tagElm.todoId == todoItem.todoId;
												});
												reTodoItem.projectColor = projectElm.projectColor;
												reTodoItem.projectName = projectElm.projectName;
												reTodoItem.projectId = projectElm.projectId;

												return reTodoItem;
											});

											return reProjectElm;
										});

										return reUserElm;
									});

									callback({allData:userObj[0], userData:userData[0], projectData:projectDatas, todoListData:todoListDatas});
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


	/**
	 * 新規ユーザ登録
	 * @param  {[type]}   userData [description]
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	function insertInitialUserData(userData, callback){
		/*
			Password, User, Project, UserProjectにデータをインサートする
		 */
		var uniqueProjectId = "p"+generateUniqueId();
		var uniqueApikey = "f"+generateUniqueId();
		dbModule.insert("Password", {userId:userData.userId, password:userData.password, apikey:uniqueApikey}, function(){
			dbModule.insert("User", {userId:userData.userId, userName:userData.userName}, function(){
				dbModule.insert("Project", {projectId:uniqueProjectId, projectName: "default", projectDetail:"This project is default project.", projectColor:"ffffff", projectOwnerId:"ToDoFlower", completion:false}, function(){
					dbModule.insert("UserProject", {userId:userData.userId, projectId:uniqueProjectId}, function(){
						callback();
					});
				});
			});
		});

	}

	/**
	 * 新規ToDoの追加
	 */
	 function insertToDo(todoData, callback){
	 	// todo, 追加する対象のprojectId, userId
	 	// 更新対象はToDo, UserToDo, ProjectToDo, ToDoTag
	 }

	 /**
	  * ToDoの上書き
	  */
	  function upsertToDo(todoData, callback){
	 	// todo, 追加する対象のprojectId, userId
	 	// 更新対象はToDo, UserToDo, ProjectToDo, ToDoTag

	  }

	 /**
	  * 新規プロジェクトの追加
	  */
	 function insertProject(projectData, callback){
	 	// project, 追加する対象のuserId
	 	// 更新対象はproject, UserProject
	 }

	 /**
	  * プロジェクトの上書き
	  */
	  function upsertProject(projectData, callback){
	 	// 更新対象はproject, UserProject
	  	
	  }

	return {
		getUserId : getUserId,
		getAllData : getAllData,
		convertArrayToObject : convertArrayToObject,
		insertInitialUserData : insertInitialUserData
	};

})();

module.exports = ACDModule;