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
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath()
  }

  move() {
    this.x += this.vx
    this.y += this.vy
  }

  collide(el){
    const colX = el.x + el.w > this.x && el.x < this.x + this.w
    const colY = el.y + el.h > this.y && el.y < this.y + this.h

    return colX && colY
  }
}