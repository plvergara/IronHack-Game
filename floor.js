class Floor {
  constructor (ctx, y){
    this.ctx = ctx
    this.x = 0
    // this.x0 = 0
    this.y = y
    this.w = 1
    this.cw = ctx.canvas.width
    this.ch = ctx.canvas.height
    this.vx = 1
  }

  draw() {  
  this.ctx.beginPath();
    //y = Math.cos(x * frequency + phi) * amplitude / 2 + amplitude / 2;
  this.ctx.fillRect(this.x, this.y, this.w, this.ch - this.y)
  this.ctx.stroke();    
  }

  // drawInit(axisX) {  
  //   this.ctx.beginPath();
  //     //y = Math.cos(x * frequency + phi) * amplitude / 2 + amplitude / 2;
  //   this.ctx.fillRect(axisX, this.y, this.w, this.ch - this.y)
  //   this.ctx.stroke();    
  //   }

  move(){    
    this.x += this.vx
    // this.x0 += this.vx
  }

  collide(el){
    const colX = el.x + el.w === this.x

    return colX
  }
}
