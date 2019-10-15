class Heart {
  constructor(ctx) {
    this.ctx = ctx
    this.y =  100
    this.w = 20
    this.h = -20
    this.x = this.ctx.canvas.width + this.w
    this.vx = 0
    this.img = new Image()
    this.img.src = "./img/heart.png"
    this.img.frames = 2
    this.img.frameIndex = 0
    this.tick = 0
  }
  
  draw() {
    this.ctx.drawImage(
      this.img,
      this.img.frameIndex * this.img.width / this.img.frames,
      0,
      this.img.width / this.img.frames,
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h)
      this._animate()
  }

  move() {
    this.x += this.vx    
  }
  
  collideWitch(el){
    const colX = el.x + el.w <= this.x && el.x >= this.x
    const colY = el.y + el.h <= this.y && el.y >= this.y
    return colX && colY
  }

  _animate() {
    this.tick++
    
    if (this.tick > 20) {
      this.tick = 0
      this.img.frameIndex++
    }   

    if (this.img.frameIndex >= this.img.frames) {
      this.img.frameIndex = 0
    }
  }
}