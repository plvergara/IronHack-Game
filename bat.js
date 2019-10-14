class Bat {
  constructor (ctx){
    this.ctx = ctx
    this.x = Math.floor(Math.random() * this.ctx.canvas.width)
    this.y = Math.floor(Math.random() * this.ctx.canvas.height)
    this.r = 10
    this.w = 40
    this.h = 30   
    this.vx = 0
    this.vy = 0
    this.dy = 0
    this.dx = 0
    this.tick = 0
    btoa.damage = false

    this.img = new Image()
    this.img.src = "./img/Bat_Sprite_Sheet.png"
    this.img.frames = 5
    this.img.frameIndex = 0
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.img.frameIndex * this.img.width / 5,
      (this.img.height / 4),
      this.img.width / 5,
      this.img.height / 4,
      this.x,
      this.y,
      this.w,
      this.h)
      this._animate()
  }

  move(el) {
    this.dx = this.x - el.x - el.w
    this.dy = this.y - el.y - el.h/2    
    this.angle = Math.atan2(this.dy, this.dx)
    this.vy = Math.sin (this.angle) * 1.5
    this.vx = Math.cos (this.angle) * 1.5
    this.x -= this.vx
    this.y -= this.vy
  }  

  collide(el){
    const colX = el.x + el.r > this.x && el.x < this.x + this.w
    const colY = el.y + el.r > this.y && el.y < this.y + this.h

    return colX && colY
  }

  collideWitch(el){
    const colX = el.x + el.w < this.x && el.x > this.x
    const colY = el.y + el.h < this.y && el.y > this.y
    if (colX && colY && !this.damage){
      this.damage = true
      this.damWitch = true
    } else {
      this.damWitch = false
    }
    return this.damWitch
  }

  _animate() {
    this.tick++
    
    if (this.tick > 8) {
      this.tick = 0
      this.img.frameIndex++
    }

    if (this.img.frameIndex >= this.img.frames) {
      this.img.frameIndex = 0
    }
  }
  
}