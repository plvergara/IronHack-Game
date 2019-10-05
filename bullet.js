class Bullet {
  constructor(ctx, x, y) {
    this.ctx = ctx
    this.y = y
    this.x = x
    this.r = 3
    this.vx = 3
    this.vy = -3
    this.g = 0.2
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath()
  }

  move() {
    this.x += this.vx
    this.vy += this.g
    this.y += this.vy
  }
}