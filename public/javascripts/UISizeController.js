class UISizeController{
	
	constructor(option) {
		this.windowWidth = window.innerWidth
		this.windowHeight = window.innerHeight
		
		this.flowerBoxRatio = 0.4				// 0.4 * window
		this.flowerCircleOrbitRatio = 0.75		// 0.75 * 0.4 * window
		this.flowerCircleRatio = 0.5 / 2		// 0.5 * 0.4 * window 
		this.flowerOrbitRatio = 0.2 / 2			// 0.2 * 0.1 * window
		
		// event listener
		this._onFlowerSizeChanged = (sizeDatas)=>{}

		setWindowResizeEvent()
		setFlowerSize()
	}

	setWindowResizeEvent(){
		var self = this;
		window.onresize = (e)=>{
			self.windowWidth = window.innerWidth
			self.windowHeight = window.innerHeight
		}
		setFlowerSize()
	}

	setFlowerSize(){
		var self = this;
		if(this.windowWidth < this.windowHeight){
			this.flowerBoxSize = this.flowerBoxRatio * this.windowWidth
		}else{
			this.flowerBoxSize = this.flowerBoxRatio * this.windowheight
		}

		this.flowerCircleRadius = this.flowerCircleRatio * this.flowerBoxSize / 2
		this.flowerCircleOrbitRadius = this.flowerCircleOrbitRatio * this.flowerBoxSize / 2
		this.flowerOrbitRadius = this.flowerOrbitRadius * this.flowerBoxSize / 2
		
		this._onFlowerSizeChanged({
			boxSize : self.flowerBoxSize,
			circleRadius : self.flowerCircleRadius,
			circleOrbitRadius : self.flowerCircleOrbitRadius,
			orbitRadius : self.flowerOrbitRadius
		});
	}

	setOnFlowerSizeChanged(callback){
		this._onFlowerSizeChanged = callback
	}

}