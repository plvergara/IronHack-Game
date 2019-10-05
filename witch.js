class Witch {
  constructor (ctx){
    this.ctx = ctx
    this.x = 50
    this.y = 0
    this.y0 = 0
    this.w = 10
    this.h = -50
    this.vx = 0
    this.vy = -0.6
    this.ay = 0
    this.g = 0.8
    this.c = "grey"
    this.jumping = false
    this.bullets = []

    this._setListeners()
  }
  draw() {    
      this.ctx.fillStyle = this.c
      this.ctx.fillRect(this.x, this.y, this.w, this.h)
      this.bullets.forEach(b => b.draw())   
  }
  move(){
    this.x += this.vx
    if (this.y < this.y0) {
      this.vy += this.g
      this.y += this.vy
    } else {
      this.vy = 0
      this.y = this.y0
    }

    this.bullets.forEach(b => b.move())
  }

  _setListeners() {
    document.onkeydown = (e) => {
      if (e.keyCode === UP){
        this.jumping = true      
        this.ay = -0.9
      } else  if (e.keyCode === RIGHT) {
        this.vx = 5
      } else if (e.keyCode === LEFT) {
        this.vx = -5
      } else if (e.keyCode === CTRL) {
        this._shoot()
        console.log(this.vx)
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
    this.vy += this.ay
    this.y += this.vy
  }

  _shoot() {
    this.bullets.push(
      new Bullet(
        this.ctx,
        this.x + this.w,
        this.y + this.h / 2
      )
    )
  }
}