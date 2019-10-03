class Witch {
  constructor (ctx){
    this.ctx = ctx
    this.x = 50
    this.y = 0
    this.y0 = 0
    this.w = 10
    this.h = -50
    this.vx = 0
    this.vy = -1
    this.g = 0.8
    this.c = "grey"
    this.jumping = false

    this._setListeners()
  }
  draw() {    
      this.ctx.fillStyle = this.c
      this.ctx.fillRect(this.x, this.y, this.w, this.h)   
  }
  move(){
    this.x += this.vx
    if (this.y < this.y0) {
      this.vy += this.g
      this.y += this.vy
    } else {
      this.vy = 0
      this.y = this.y0
    }
  }

  _setListeners() {
    document.onkeydown = (e) => {
      if (e.keyCode === UP){
        this.jumping = true      
        this.ay = -1
      } else  if (e.keyCode === RIGHT) {
        this.vx = 5
      } else if (e.keyCode === LEFT) {
        this.vx = -5
      } 
    }

    document.onkeyup = (e) => {
      if (e.keyCode === UP) {
        this.jumping = false 
      } else if (e.keyCode === RIGHT) {
        this.vx = 0
      } else if (e.keyCode === LEFT) {
        this.vx = 0
      }
    }
  }

  jump(){
    this.vy += this.ay
    this.y += this.vy
  }
}