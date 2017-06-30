/**
 * ToDoFlowerオブジェクトを管理する
 */

/**
 	ToDoFlowerの配置
 	ドラッグアンドドロップイベント
 	サイズ変更イベントなど
 	表示の変化など
 */
class ToDoFlowerManager{

	constructor(){
		this.UISizeController = new UISizeController()
		this.ToDoFlowerList = new Map() //{key: projectId, value: projectObject}
	}

	changeFlowerSize(sizeData){
		// notification each ToDoFlower Object
		var self = this
		this.ToDoFlowerList.forEach((elm, ind, map)=>{
			
		})
	}



}