window.onload = function() {
  const canvas = document.getElementById("my-canvas")
  const ctx = canvas.getContext("2d")
  
  const game = new Game(ctx)

  document.getElementById("start-button").onclick = function() {    
    document.getElementById("intro").classList.toggle("invisible")
    document.getElementById("game").classList.toggle("invisible")
    startGame()   
    document.getElementById("start-button").disabled = true
  }

  function startGame() {
    game.run()
  }
}