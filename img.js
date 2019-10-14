class Img {
  constructor(ctx, src) {
    this.ctx = ctx;
    this.w = this.ctx.canvas.width
    this.h = this.ctx.canvas.height
    this.x = 0
    this.y = 0

    this.img = new Image()
    this.img.src = src
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    )

    this.ctx.drawImage(
      this.img,
      this.x + this.w,
      this.y,
      this.w,
      this.h
    )
  }

  move(vx) {
    this.x += vx

    if (this.x + this.w <= 0) {
      this.x = 0
    }
  }
}