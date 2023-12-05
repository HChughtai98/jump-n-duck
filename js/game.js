class Game {
  constructor() {
    this.landingPage = document.getElementById("landingPage");
    this.gameScreen = document.getElementById("gameScreen");
    this.gameOverPage = document.getElementById("endScreenPage");
    this.easterEgg = document.getElementById("easterEgg");
    this.height = 923;
    this.width = 1920;
    this.y = 500;
    this.x = 500;
    this.player = null;
    this.obstacles = [];
    this.animateId = null;
    this.restartButton = document.getElementById("restart-btn"); // assuming you have an element with id "restart-btn"

    if (this.restartButton) {
      this.restartButton.addEventListener("click", () => {
        this.restartGame();
      });
    }
  }

  startGame() {
    this.landingPage.style.display = "none";
    this.gameOverPage.style.display = "none";
    this.easterEgg.style.display = "none";
    this.gameScreen.style.display = "flex";

    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    this.player = new Player(this.gameScreen);

    for (let i = 0; i < 10000; i++) {
      setTimeout(() => {
        if (Math.random() >= 0.5) {
          this.obstacles.push(new Obstacle(this.gameScreen, 800));
        } else {
          this.obstacles.push(new Obstacle(this.gameScreen, 710));
        }
      }, i * 550);
    }
  }

  checkCollision(player, obstacle) {
    const playerLeft = player.x;
    const playerRight = player.x + player.width;
    const playerTop = player.y;
    const playerBottom = player.y + player.height;

    const obstacleLeft = obstacle.left;
    const obstacleRight = obstacle.left + obstacle.width;
    const obstacleTop = obstacle.top;
    const obstacleBottom = obstacle.top + obstacle.height;

    console.log("Player:", playerLeft, playerRight, playerTop, playerBottom);
    console.log(
      "Obstacle:",
      obstacleLeft,
      obstacleRight,
      obstacleTop,
      obstacleBottom
    );

    const isCollision =
      playerLeft < obstacleRight &&
      playerRight > obstacleLeft &&
      playerTop < obstacleBottom &&
      playerBottom > obstacleTop;

    console.log("Collision detected:", isCollision);

    return isCollision;
  }

  gameLoop() {
    if (this.gameIsOver) return;

    this.obstacles.forEach((currentObstacle) => {
      currentObstacle.move();

      // Add a console log here
      console.log("Checking collision...");
      if (this.checkCollision(this.player, currentObstacle)) {
        // Collision occurred, end the game
        console.log("Collision detected, ending game...");
        this.endGame();
      }
    });

    this.update();
    window.requestAnimationFrame(() => this.gameLoop());
  }

  endGame() {
    this.gameIsOver = true;
    this.gameScreen.style.display = "none";
    this.gameOverPage.style.display = "flex";
  }

  update() {
    this.player.updatePosition();
  }

  endGame() {
    this.gameIsOver = true;
    this.gameScreen.style.display = "none";
    this.gameOverPage.style.display = "flex";
  }

  setupRestartButton() {
    const restartButton = document.getElementById("restart-btn");

    restartButton.addEventListener("click", () => {
      this.restartGame();
    });
  }

  restartGame() {
    this.gameScreen.style.display = "flex";
    this.gameOverPage.style.display = "none";
    this.gameIsOver = false;
  }

  activateEasterEgg() {
    cancelAnimationFrame(this.animateId);
    this.gameScreen.style.display = "none";
    this.easterEgg.style.display = "flex";
    this.easterEgg.style.flexDirection = "column";

    const easterEggImage = document.createElement("img");
    easterEggImage.src = "../Game_assets/mat.jpg";
    easterEggImage.style.width = "100%";
    easterEggImage.style.height = "100%";

    const easterEggText = document.createElement("div");
    easterEggText.innerText =
      "I can simply snap my fingers and it'll all cease to exist";
    easterEggText.style.position = "absolute";
    easterEggText.style.top = "90%";
    easterEggText.style.left = "50%";
    easterEggText.style.transform = "translate(-50%, -50%)";
    easterEggText.style.color = "rgba(255, 255, 255)";
    easterEggText.style.fontSize = "4em";
    easterEggText.style.textAlign = "center";
    easterEggText.style.fontFamily = "Impact, Charcoal, sans-serif";
    easterEggText.style.letterSpacing = "4px";
    easterEggText.style.width = "100%";
    easterEggText.style.textTransform = "uppercase";

    const backButton = document.createElement("button");
    backButton.innerText = "Home";
    backButton.id = "back-btn";
    this.setStyle(backButton);

    backButton.addEventListener("click", () => {
      location.reload();
    });

    this.easterEgg.innerHTML = "";
    this.easterEgg.appendChild(easterEggImage);
    this.easterEgg.appendChild(easterEggText);
    this.easterEgg.appendChild(backButton);

    void easterEggImage.offsetWidth;

    // Use JavaScript to add the "show" class after a short delay
    let opacity = 0;
    const fadeInInterval = setInterval(() => {
      opacity += 0.01; // Adjust the step as needed
      easterEggImage.style.opacity = opacity;
      if (opacity >= 1) {
        clearInterval(fadeInInterval);
      }
    }, 20); // Adjust the interval as needed
  }

  setStyle(element) {
    element.position = "absolute";
    element.style.width = "30%";
    element.style.padding = "20px";
    element.style.boxSizing = "border-box";
    element.style.color = "rgba(255, 255, 255)";
    element.style.fontSize = "2em";
    element.style.fontFamily = "Impact, Charcoal, sans-serif";
    element.style.letterSpacing = "2px";
    element.style.textTransform = "uppercase";
  }
}
