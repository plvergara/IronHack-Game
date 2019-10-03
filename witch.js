class Witch {
  constructor (ctx){
    this.ctx = ctx
    this.x = 0
    this.y = 300
    this.w = 60
    this.h = -50
    this.vx = 0
    this.c = "grey"
  }
  draw() {    
      this.ctx.fillStyle = this.c
      this.ctx.fillRect(this.x, this.y, this.w, this.h)   
  }
  move(){
    this.x += this.vx
  }
}