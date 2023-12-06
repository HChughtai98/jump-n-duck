window.addEventListener("load", () => {
  const startButton = document.getElementById("start-btn");
  const controlsButton = document.getElementById("controls-btn");
  const restartButton = document.getElementById("restart-btn");
  const backButton = document.getElementById("back-btn");

  let game;

  function startGame() {
    game = new Game();
    game.startGame();
    game.gameLoop();
  }

  function startEasterEgg() {
    if (game) {
      game.activateEasterEgg();
      game.easterEgg.classList.add("fade-in");
    }
  }

  function showControls() {
    const controlsPage = document.getElementById("controlsPage");
    controlsPage.innerHTML =
      "<h1>Controls</h1><p>Arrow Up: Jump</p><p>Arrow Down: Crouch</p>";
    controlsPage.style.display = "block";

    controlsPage.addEventListener("click", function () {
      controlsPage.style.display = "none";
    });
  }

  document.body.addEventListener("keydown", function (e) {
    if (e.key === "m" || e.key === "M") {
      startEasterEgg();
    }
  });

  startButton.addEventListener("click", function () {
    startGame();
  });

  controlsButton.addEventListener("click", function () {
    showControls();
  });

  restartButton.addEventListener("click", function () {
    if (game && game.gameIsOver) {
      startGame();
    }
  });

  backButton.addEventListener("click", function () {
    location.reload();
  });
});
