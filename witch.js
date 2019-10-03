class Witch {
  constructor (ctx){
    this.ctx = ctx
    this.x = 50
    this.y = 300
    this.w = 10
    this.h = -50
    this.vx = 0
    this.vy = -5
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
  }

  _setListeners() {
    document.onkeydown = (e) => {
      if (e.keyCode === UP){
        this.jumping = true      
        this.vy = -150
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
    this.y += this.vy
  }
}