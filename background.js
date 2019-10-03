class Background {
  constructor(ctx) {
    this.ctx = ctx    
    this.x = 0
    this.amplitude = 100
    this.frequency = 0.01
    this.floorInit = []
    this.floor = []
    // for (this.i = 0; this.x <= this.ctx.canvas.width; this.i++) {
    //   this.y = Math.sin(this.x * this.frequency) * this.amplitude + this.amplitude * 4
    //   const fl = new Floor(this.ctx, this.y)
    //   fl.drawInit(this.x)
    //   this.floorInit.push(fl)
    //   this.x++
    // }
  }

  clearFloor() {
    this.floor = this.floor.filter(fl => {
      return fl.x + fl.w >= 0     
    })
  }

  _addFloor() {
    this.y = Math.sin(this.x * this.frequency) * this.amplitude + this.amplitude * 4
    this.floor.push(new Floor(this.ctx, this.y))
    this.x++
  }

  draw() { 
    this.floor.forEach(fl => fl.draw())    
  }

  move() {
    this._addFloor()
    this.floor.forEach(fl => fl.move()) 
  }  
}