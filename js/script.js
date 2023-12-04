window.addEventListener("load", () => {
  const startButton = document.getElementById("start-btn");
  const controlsButton = document.getElementById("controls-btn");
  const restartButton = document.getElementById("restart-btn");

  let game;

  function startGame() {
    game = new Game();
    game.startGame();
    game.gameLoop();
  }

  startButton.addEventListener("click", function () {
    startGame();
  });
  controlsButton.addEventListener("click", function () {
    location.reload();
  });
});
