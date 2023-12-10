window.addEventListener("load", () => {
  const startButton = document.getElementById("start-btn");
  const restartButton = document.getElementById("restart-btn");

  let game;
  let mKeyPressed = false;

  function startGame() {
    game = new Game();
    game.startGame();
    game.gameLoop();
  }

  function startEasterEgg() {
    if (game && !mKeyPressed && !game.gameIsOver) {
      game.activateEasterEgg();
      game.easterEgg.classList.add("fade-in");
      mKeyPressed = true;
    }
  }

  document.body.addEventListener("keydown", function (e) {
    if (e.key === "m" || e.key === "M") {
      startEasterEgg();
    }
  });

  startButton.addEventListener("click", function () {
    startGame();
  });

  restartButton.addEventListener("click", function () {
    if (game && game.gameIsOver) {
      startGame();
      mKeyPressed = false;
    }
  });
});
