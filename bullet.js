class Bullet {
  constructor(ctx, x, y, dir) {
    this.ctx = ctx
    this.y = y
    this.x = x
    this.r = 15
    this.w = this.r
    this.h = this.r
    this.dir = dir
    this.vx = dir * 3
    this.vy = -5
    this.g = 0.2    
    this.img = new Image()
    this.img.src = "./img/stone.png"
    this.img.frameIndex = 0
  }

  draw() {
    this.ctx.drawImage(
      this.img,
        this.x,
        this.y,
        this.w,
        this.h)
  }

  move() {
    this.x += this.vx
    this.vy += this.g
    this.y += this.vy
  }  
}