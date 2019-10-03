class Game {
  constructor(ctx) {
    this.ctx = ctx  
    this.bg = new Background(this.ctx)    
    this.witch = new Witch(this.ctx,"grey")
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
      if (o.collide(this.witch)) this.witch.y = o.y
    })   
  }
}