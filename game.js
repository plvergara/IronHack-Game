class Game {
  constructor(ctx) {
    this.ctx = ctx  
    this.bg = new Background(this.ctx)    
    this.witch = new Witch(this.ctx,"grey")
    this.vy = -50

    // this._setListeners()
  }

  run() {    
    this.intervalId = setInterval(() => {
      this._checkFloor()
      this._clear()
      this._draw()
      this._move()    
    }, FPS)
  }

  _clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    this.bg.clearFloor()
  }

  _draw() {
    this.bg.draw()
    this.witch.draw()
  }

  _move() {
    // document.onkeydown = (e) => {
    //   if (e.keyCode === RIGHT) {
        this.bg.move()
        this.witch.move()
    //   }
    // }
  }

  _checkFloor() {
    this.bg.floor.forEach(o => {
      if (o.collide(this.witch)){
        this.witch.y = o.y
        if (this.witch.jumping) { 
          this.witch.jump()
        }
      }
    })  
  }

  // _setListeners() {
  //   document.onkeydown = (e) => {
  //     if (e.keyCode === UP){        
  //       this.jump = true
  //     } 
  //     // else  if (e.keyCode === RIGHT) {
  //     //   this.vx = 5
  //     // } else if (e.keyCode === LEFT) {
  //     //   this.vx = -5
  //     // } 
  //   }

  //   document.onkeyup = (e) => {
  //     if (e.keyCode === UP){
  //       this.jump = false
  //     } 
  //     // else if (e.keyCode === RIGHT) {
  //     //   this.vx = 0
  //     // } else if (e.keyCode === LEFT) {
  //     //   this.vx = 0
  //     // }
  //   }
  // }
}