class Game {
  constructor(ctx) {
    this.ctx = ctx  
    this.bg = new Background(this.ctx)    
    this.witch = new Witch(this.ctx)    
    this.bats = []
    this.tick = 0
    this.tickBroom = 0
    this.tickCauldron = 0
    this.tickHeart = 0
    this.lives = 5
    this.broom = null
    this.cauldron = null
    this.heart = null  
    this.score = 0
    this.scoreFormat = ('0000'+this.score).slice(-4);
    this.audio = new Audio("./music.mp3")
    this.audio.loop = true;
    this.gameOverAudio = new Audio('./gameover.mp3')
    this.finish = 9000
    }

  run() { 
    this.audio.play()   
    this.intervalId = setInterval(() => {      
      this._clear()
      this._addBats()      
      if (this.broom) this._checkCollisonBroom()
      if (this.cauldron) this._checkCollisonCauldron()
      if (this.heart) this._checkCollisionHeart()
      this._checkCollisionsBullet()
      this._checkLives()
      this._checkFloor()
      this._draw()      
      this._move()
      this._checkCollisionWitch()
      this._printScore()    
    }, FPS)
  }

  _clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    this.bg.clearFloor()
  }

  _draw() {
    this.bg.draw()
    this.witch.draw()
    if (this.broom) this.broom.draw()
    if (this.cauldron) this.cauldron.draw()
    if (this.heart) this.heart.draw()
    this.bats.forEach(b => b.draw()) 
  }

  _move() {
        
    if (this.witch.x >= this.ctx.canvas.width/3){
      this.witch.runRight ? this.bg.vx = -1 : this.bg.vx = 0
      this.bg.move()
      this.tickBroom++
      this.tickCauldron++
      this.tickHeart++

      if (this.cauldron && this.witch.runRight){
        this.cauldron.vx = VXFLOOR
        this.cauldron.move()
      }
      if (this.broom && this.witch.runRight){
        this.broom.vx = VXFLOOR
        this.broom.move()
      }
      if (this.heart && this.witch.runRight){
        this.heart.vx = VXFLOOR
        this.heart.move()
      }        
      if (this.broom && !this.witch.runRight) this.broom.vx = 0
      if (this.cauldron && !this.witch.runRight) this.cauldron.vx = 0
      if (this.heart && !this.witch.runRight) this.heart.vx = 0
    }      
      this.witch.move()      
      this.bats.forEach(b => b.move(this.witch))
  }

  _addBats() {
    this.tick = Math.random() * 10000
    if (this.tick >= 9900 && this.bats.length < 3) {
      this.bats.push(new Bat(this.ctx))
    }

  }

  _checkFloor() {
    this.bg.floor.forEach(o => {
      if (o.collide(this.witch)){
        this.witch.vy = 0
      }
      if (o.collideY(this.witch)){
        this.witch.y0 = o.y
        if (this.witch.jumping) { 
          this.witch.jump()
        }
      }
    })
    if (this.broom) {
      this.bg.floor.forEach(o => {
        if (o.collideY(this.broom)){
          this.broom.y = o.y
        }
      })
    }

    if (this.cauldron) {
      this.bg.floor.forEach(o => {
        if (o.collideY(this.cauldron)){
          this.cauldron.y = o.y
        }
      })
    }
    
    if (!this.witch.jumping && !this.broom && this.tickBroom >= 900) {
      this.broom = new Broom(this.ctx)      
      this.tickBroom = 0
    }
    if (this.tickHeart >= 1200 && !this.heart) {
      this.heart = new Heart(this.ctx)
      this.tickHeart -= 900
    }
    if (this.tickCauldron >= this.finish && !this.cauldron) {
      this.cauldron = new Cauldron(this.ctx)
      this.tickCauldron = 0
    }

    if (this.cauldron && this.cauldron.x <= 0) {
      this._gameOver()      
    }

    if (this.broom && this.broom.x <= 0) {
      this.broom = null      
    }
    if (this.heart && this.heart.x <= 0) {
      this.heart = null      
    }
  }

  _checkCollisionsBullet() {
    this.bats = this.bats.filter(bt => {
      return !this.witch.bullets.some(b => {
        if (bt.collide(b)) {
          this.score++
        }
        return bt.collide(b)
      })
    })
  }

  _checkCollisionWitch() {
    const col = this.bats.some(bt =>
        bt.collideWitch(this.witch))
    if (col) {
      this.lives--
      let heart = document.querySelector(".heart")
      heart.querySelector(".lives .red").classList.toggle("invisible")
      heart.querySelector(".lives .invisible.grey").classList.toggle("invisible")
      heart.classList.toggle("heart")
      heart.classList.toggle("empty-heart")
    }
  }

  _checkCollisonBroom() {
    const col = this.broom.collideWitch(this.witch)
    
    if (col) {
      this.broom = null
      this.witch.jumping = true      
    }
  }

  _checkCollisonCauldron() {
    const col = this.cauldron.collideWitch(this.witch)    
    if (col) {
      this._win()   
    }
  }

  _checkCollisionHeart() {
    const col = this.heart.collideWitch(this.witch)    
    if (col) {
      this.heart = null
      if (this.lives < 5) { 
        this.lives++
        let heartsEmpty = document.querySelectorAll(".empty-heart")
        let heartEmpty = heartsEmpty[heartsEmpty.length - 1]
        heartEmpty.querySelector(".lives .red.invisible").classList.toggle("invisible")
        heartEmpty.querySelector(".lives .grey").classList.toggle("invisible")
        heartEmpty.classList.toggle("heart")
        heartEmpty.classList.toggle("empty-heart")
      }
     this.score += 50  
    }
  }

  _checkLives() {
    if (this.lives <= 0) {
      this._gameOver()
    }
  }

  _printScore() {
    this.scoreFormat = ('0000'+this.score).slice(-4);    
    document.querySelector(".points").innerHTML = this.scoreFormat
  }

  _gameOver() {
    this.audio.pause()
    this.gameOverAudio.play()
    clearInterval(this.intervalId)
    document.getElementById("game").classList.toggle("invisible")
    document.getElementById("game-over").classList.toggle("invisible")
    this.scoreFormat = ('0000'+this.score).slice(-4);    
    document.querySelector(".final-points").innerHTML = this.scoreFormat    
  }

  _win() {
    this.audio.pause()
    this.gameOverAudio.play()
    clearInterval(this.intervalId)
    document.getElementById("game").classList.toggle("invisible")
    document.getElementById("game-over").classList.toggle("invisible")
    document.querySelector("#game-over h1").innerHTML = "You WON!"
    this.scoreFormat = ('0000'+this.score).slice(-4);    
    document.querySelector(".final-points").innerHTML = this.scoreFormat    
  }
}