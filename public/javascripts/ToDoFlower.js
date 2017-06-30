/**
 * Project, ToDoを花のように表現するUIオブジェクト
 */
class ToDoFlower{

	constructor(_project, _option){

		/*
			option:{
				boxRatio,
				circleRatio,
				orbitRatio,
				circleOrbitRatio,
				top,
				left
			}
		 */
		var option = _option || {}
		var project = _project || {
			projectName : "none"
		}
		console.log(project)

		this.targetElementId = option.id || "flower_div"

		this.windowWidth = window.innerWidth
		this.windowHeight = window.innerHeight
		
		this.flowerBoxRatio = option.boxRatio || 0.4						// 0.4 * window
		this.flowerCircleOrbitRatio = option.circleOrbitRatio || 0.75		// 0.75 * 0.4 * window
		this.flowerCircleRatio = option.circleRatio || 0.5 / 2				// 0.5 * 0.4 * window 
		this.flowerOrbitRatio = option.orbitRatio || 0.2 / 2				// 0.2 * 0.1 * window

		this.flowerPositionTopRatio = option.boxTopRatio || 0.5
		this.flowerPositionLeftRatio = option.boxLeftRatio || 0.5 

		this.petalElements = []

		// event listener	
		this._onFlowerFrameChanged = (sizeDatas)=>{}

		this._setWindowResizeEvent()

		this._initToDoFlowerBoxElement()
		this._setFlowerFrame()

		this._initToDoFlowerProjectElement(project)
		this._initToDoFlowerListElement(project)

	}

	/*
		private method
	 */

	_setWindowResizeEvent(){
		var self = this;
		window.addEventListener('resize',(event)=>{
			self.windowWidth = window.innerWidth
			self.windowHeight = window.innerHeight
			self._setFlowerFrame()
		})
	}

	_initToDoFlowerBoxElement(){
		this.boxElement = document.createElement("div")
		this.boxElement.className = "project_box_div"
		this.boxElement.style.width = String(this.flowerBoxSize) + "px"
		this.boxElement.style.height = String(this.flowerBoxSize) + "px"
		this.boxElement.style.top = String(this.flowerPositionTop) + "px"
		this.boxElement.style.left = String(this.flowerPositionLeft) + "px"
		document.getElementById(this.targetElementId).appendChild(this.boxElement)
	}

	_initToDoFlowerProjectElement(project){
		this.projectElement = document.createElement("div")
		this.projectElement.className = "project_circle_div"
		this.projectElement.id = project.projectId
		this.projectElement.style.backgroundColor = "#"+project.projectColor
		
		var titleDiv = document.createElement("div")
		var projectTitle = document.createElement("p")
		var projectDetail = document.createElement("p")

		projectTitle.innerHTML = "<strong>"+project.projectName+"</strong>"
		projectDetail.innerHTML = project.projectDetail

		titleDiv.appendChild(projectTitle)
		titleDiv.appendChild(projectDetail)

		this.projectElement.appendChild(titleDiv)
		this.boxElement.appendChild(this.projectElement)
	}

	_initToDoFlowerListElement(project){
		if(project.todoList){
			this.todoListLength = project.todoList.length
			project.todoList.forEach((elm, ind, arr)=>{
				var todoElement = document.createElement('div')
				var angle = (ind * (360 / this.todoListLength) - 90) * (Math.PI / 180)
				console.log()

				todoElement.className = "todo_petal_div"
				todoElement.style.top = String(this.flowerBoxSize / 2 + this.flowerCircleOrbitRadius * Math.sin(angle)) + "px"
				todoElement.style.left = String(this.flowerBoxSize / 2 + this.flowerCircleOrbitRadius * Math.cos(angle)) + "px"
				todoElement.style.backgroundColor = "#" + elm.projectColor

				var titleDiv = document.createElement("div")
				var todoTitle = document.createElement("p")
				var todoPriority = document.createElement("p")

				todoTitle.innerHTML = "<strong>"+elm.title+"</storng>"
				todoPriority.innerHTML = "priority : " + String(elm.priority)

				titleDiv.appendChild(todoTitle)
				titleDiv.appendChild(todoPriority)
				todoElement.appendChild(titleDiv)

				this.petalElements.push(todoElement)
				this.boxElement.appendChild(todoElement)				
			})
		}else{
			this.todoListLength = 0
		}
	}

	_setFlowerFrame(){
		var self = this;
		if(this.windowWidth < this.windowHeight){
			this.flowerBoxSize = this.flowerBoxRatio * this.windowWidth
		}else{
			this.flowerBoxSize = this.flowerBoxRatio * this.windowHeight
		}

		this.flowerCircleRadius = this.flowerCircleRatio * this.flowerBoxSize / 2
		this.flowerCircleOrbitRadius = this.flowerCircleOrbitRatio * this.flowerBoxSize / 2
		this.flowerOrbitRadius = this.flowerOrbitRadius * this.flowerBoxSize / 2
		
		this.flowerPositionTop = this.windowHeight * this.flowerPositionTopRatio
		this.flowerPositionLeft = this.windowWidth * this.flowerPositionLeftRatio
		this._adaptFrameToFlowerElements()
		this._onFlowerFrameChanged({
			boxSize : self.flowerBoxSize,
			circleRadius : self.flowerCircleRadius,
			circleOrbitRadius : self.flowerCircleOrbitRadius,
			orbitRadius : self.flowerOrbitRadius,
			top : self.flowerPositionTop,
			left : self.flowerPositionLeft
		});
	}

	_adaptFrameToFlowerElements(){
		// uiにポジションサイズを反映
		this.boxElement.style.width = String(this.flowerBoxSize) + "px"
		this.boxElement.style.height = String(this.flowerBoxSize) + "px"
		this.boxElement.style.top = String(this.flowerPositionTop) + "px"
		this.boxElement.style.left = String(this.flowerPositionLeft) + "px"		

		this.petalElements.forEach((elm, ind, arr)=>{
			var angle = (ind * (360 / this.todoListLength) - 90) * (Math.PI / 180)
			elm.style.top = String(this.flowerBoxSize / 2 + this.flowerCircleOrbitRadius * Math.sin(angle)) + "px"
			elm.style.left = String(this.flowerBoxSize / 2 + this.flowerCircleOrbitRadius * Math.cos(angle)) + "px"
				
		});
	}

	/*
		public method
	 */

	addToDoElement(todo){
		this.todoListLength = this.todoListLength + 1
		var todoElement = document.createElement('div')

		//elementに情報を全部載せる

		todoElement.className = "todo_petal_div"
		todoElement.style.backgroundColor = "#" + todo.projectColor

		var titleDiv = document.createElement("div")
		var todoTitle = document.createElement("p")
		var todoPriority = document.createElement("p")
		var todoTag = document.createElement("p")

		todoTitle.innerHTML = "<strong>"+todo.title+"</storng>"
		todoPriority.innerHTML = "priority : " + String(todo.priority)

		var tagString = ""
		todo.tag.forEach((elm, ind, arr)=>{
			if(ind == 0){
				tagString = elm.tag
			}else{
				tagString = tagString + ", " + elm.tag
			}
		})

		todoTag.innerHTML = tagString

		titleDiv.appendChild(todoTitle)
		titleDiv.appendChild(todoPriority)
		titleDiv.appendChild(todoTag)
		todoElement.appendChild(titleDiv)

		this.petalElements.push(todoElement)
		this.boxElement.appendChild(todoElement)				

		this._adaptFrameToFlowerElements()
	}

	_setOnMouseOverToDoEvent(element){

	}

	_setOnClickToDoEvent(element){

	}

	_setBoxAnimation(){

	}

	_setToDoAnimation(){

	}

	// set event listener
	setOnFlowerFrameChanged(callback){
		this._onFlowerFrameChanged = callback
	}

}




/**
 * ToDoを表現するUIオブジェクト
 */
class ToDoPetal{
	constructor(){

	}
}



class ToDoFlowerElement{

	constructor(project, sizeOption){

	}
}




