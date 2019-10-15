class Witch {
  constructor (ctx){
    this.ctx = ctx
    this.x = 50
    this.y = 0
    this.y0 = 0
    this.w = -100
    this.h = -90
    this.vx = 0
    this.vy = 0
    this.ay = 0
    this.g = 0.5
    this.c = "grey"
    this.d = 1
    this.jumping = false
    this.bullets = []
    this.tick = 0
    this.run = false
    this.runRight = false
    this.tickFly = 0

    this.img = new Image()
    this.img.src = "./img/witch.png"
    this.img.frames = 8
    this.img.frameIndex = 0

    this._setListeners()
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
      this.bullets.forEach(b => b.draw())   
  }

  move(){
    this.x += this.vx
    if (this.y + this.h <= 0){
      this.y = - this.h
      this.vy = 0
    }
    if (this.x + this.h <= 0){
      this.x = - this.w
      this.vx = 0
    }
    if (this.y < this.y0) {
      this.vy += this.g
      this.y += this.vy
    } else {
      this.vy = 0
      this.y = this.y0
    }    
    if (this.x >= 3 * this.ctx.canvas.width / 4) {
      this.vx = 0
      this.x = 3 * this.ctx.canvas.width / 4
    }

    this.bullets.forEach(b => b.move())
  }

  _animate() {
    this.tick++
    
    if (this.tick > 5) {
      this.tick = 0
      if (this.run ) this.img.frameIndex++
    }   

    if (this.img.frameIndex >= this.img.frames) {
      this.img.frameIndex = 0
    }
  }

  _setListeners() {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === UP){
        this.run = true
        this.ay = - 0.51
      } else  if (e.keyCode === RIGHT) {
        this.run = true
        this.runRight = true
        this.img.src = "./img/witch.png"
        this.vx = 3
        this.d = 1
        if (this.jumping) {
          this.img.src = "./img/witch_fly.png"
        }
      } else if (e.keyCode === LEFT) {
        this.run = true
        this.img.src = "./img/witch_left.png"
        this.d = -1
        this.vx = -3
        if (this.jumping) {
          this.img.src = "./img/witch_fly_left.png"
        }       
      } else if (e.keyCode === SPACE) {
        this._shoot()
      }
    })

    document.addEventListener("keyup", (e) => {
      if (e.keyCode === UP) {
        this.run = false
        this.ay = 0        
      } else if (e.keyCode === RIGHT) {
        this.run = false
        this.runRight = false
        this.img.frameIndex = 0
        this.vx = 0
      } else if (e.keyCode === LEFT) {
        this.run = false
        this.vx = 0
      }
    })
  }

  jump(){
    if (this.jumping) {      
      this.tickFly++
      this.vy += this.ay 
      this.y += this.vy
      this.img.frames = 4
      if (this.tickFly >= 800){
        this.tickFly = 0
        this.jumping = false
        this.img.src = "./img/witch.png"
        this.img.frames = 8
      }
    }
  }

  _shoot() {
    this.bullets.push(
      new Bullet(
        this.ctx,
        this.x + this.w / 4,
        this.y + this.h / 3,
        this.d
      )
    )
  }
}