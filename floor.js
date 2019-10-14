class Floor {
  constructor (ctx){
    this.ctx = ctx
    this.w = -300
    this.h = 100
    this.x = this.ctx.canvas.width - this.w
    // this.x0 = 0
    this.y = this.ctx.canvas.height - this.h
    
    this.vx = 0
    this.img = new Image()
    this.img.src = "./img/forest-theme/floor_pixel.png"
  }  

  draw() {    
    this.ctx.drawImage(
      this.img,
        this.x,
        this.y,
        this.w,
        this.h)
  }

  move(vx){    
    this.x += vx
  }

  collideY(el){
    const colX = el.x + el.w / 2 >= this.x + this.w && el.x + el.w / 2 <= this.x
    return colX
  }

  collide(el){
    const colX = el.x === this.x + this.w
    const colY = el.y - el.h > this.y
    return colX && colY
  }

  rotate()  {
    this.ctx.save()
    this.ctx.rotate(20 * Math.PI / 270)
    this.ctx.drawImage(
      this.img,
        this.x,
        this.y,
        this.w,
        this.h)
    this.ctx.restore()
  }
}
