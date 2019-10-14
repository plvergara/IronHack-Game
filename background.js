class Background {
  constructor(ctx) {
    this.ctx = ctx
    this.amplitude = 100
    this.frequency = 0.01    
    this.tick = 0
    this.y = 0
    this.x = 0
    this.vx = 0
    this.img = new Img(this.ctx,"./img/background/plx-1.png")
    this.img2 = new Img(this.ctx,"./img/background/plx-2.png")
    this.img3 = new Img(this.ctx,"./img/background/plx-3.png")
    this.img4 = new Img(this.ctx,"./img/background/plx-4.png")
    this.floor = []
    for (this.i = 0; this.x <= this.ctx.canvas.width + 300; this.i += 300 ) {
      let fl = new Floor(this.ctx)
      this.x = this.i
      fl.x = this.x
      this.floor.push(fl)
    }
    this.tickR = 0
    this._setListeners()
  }

  clearFloor() {
    this.floorInit = this.floor.filter(fl => {
      return fl.x - fl.w >= 0     
    })
    this.floor = this.floor.filter(fl => {
      return fl.x - fl.w >= 0     
    })
  }

  _addFloor() {
    if (this.tick >= 300){
      this.floor.push(new Floor(this.ctx))      
      this.tickR = Math.random() * 100
      if (this.tickR >= 70) {
        let fl = new Floor(this.ctx)        
        fl.y -= 70
        this.floor.push(fl)         
      }
      this.tick = 0
    }
  }

  draw() {
    this.img.draw()
    this.img2.draw()
    this.img3.draw()
    this.img4.draw()
    this.floor.forEach(fl => fl.draw())            
       
  }

  move() {
    if (this.vx !== 0){
      this._addFloor()
    }
    this.img.move(this.vx)
    this.img2.move(this.vx*0.7)
    this.img3.move(this.vx*0.8)
    this.img4.move(this.vx*0.9)
    this.tick++
            
    this.floor.forEach(fl => fl.move(this.vx))    
  }

  _setListeners() {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === RIGHT) {
        this.vx = -1
      }
    })

    document.addEventListener("keyup", (e) => {
      if (e.keyCode === RIGHT) {
        this.vx = 0
      }
    })
  }
}