class Cauldron {
  constructor(ctx) {
    this.ctx = ctx
    this.y =  this.ctx.canvas.height - 100
    this.r = 10
    this.w = 100
    this.h = -50
    this.x = this.ctx.canvas.width - this.w
    this.vx = VXFLOOR
    this.img = new Image()
    this.img.src = "./img/bush.png"
    this.img.frames = 1
    this.img.frameIndex = 0
    this._setListeners()
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
  }
  
  collideWitch(el){
    const colX = el.x + el.w >= this.x && el.x <= this.x + this.w
    return colX
  }

  _setListeners() {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === RIGHT) {
        this.vx = VXFLOOR
      }
    })

    document.addEventListener("keyup", (e) => {
      if (e.keyCode === RIGHT) {
        this.vx = 0
      }
    })
  }
}