class Bat {
  constructor (ctx){
    this.ctx = ctx
    this.x = Math.floor(Math.random() * this.ctx.canvas.width)
    this.y = Math.floor(Math.random() * this.ctx.canvas.height)
    this.w = 0
    this.h = 0
    this.r = 10
    this.vx = 0
    this.vy = 0
    this.dy = 0
    this.dx = 0
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath()
  }

  move(witch) {
    this.dx = this.x - witch.x
    this.dy = this.y - witch.y    
    this.angle = Math.atan2(this.dy, this.dx)
    this.vy = Math.sin (this.angle)
    this.vx = Math.cos (this.angle)
    this.x -= this.vx
    this.y -= this.vy
  }

  collide(el){
    const colX = el.x + el.w > this.x && el.x < this.x + this.w
    const colY = el.y + el.h > this.y && el.y < this.y + this.h

    return colX && colY
  }
}