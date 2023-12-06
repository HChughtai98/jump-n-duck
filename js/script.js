window.addEventListener("load", () => {
  const startButton = document.getElementById("start-btn");
  const restartButton = document.getElementById("restart-btn");
  const backButton = document.getElementById("back-btn");

  let game;
  let mKeyPressed = false; // Flag to track if 'M' has been pressed

  function startGame() {
    game = new Game();
    game.startGame();
    game.gameLoop();
  }

  function startEasterEgg() {
    if (game && !mKeyPressed && !game.gameIsOver) {
      game.activateEasterEgg();
      game.easterEgg.classList.add("fade-in");
      mKeyPressed = true; // Set the flag to true once 'M' is pressed
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
      mKeyPressed = false; // Reset the flag when restarting the game
    }
  });

  backButton.addEventListener("click", function () {
    location.reload();
  });
});
