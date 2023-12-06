class Game {
  constructor() {
    this.landingPage = document.getElementById("landingPage");
    this.gameScreen = document.getElementById("gameScreen");
    this.gameOverPage = document.getElementById("endScreenPage");
    this.easterEgg = document.getElementById("easterEgg");
    this.scoreCounter = document.getElementById("scoreCounter");
    this.height = 923;
    this.width = 1920;
    this.y = 500;
    this.x = 500;
    this.player = null;
    this.obstacles = [];
    this.score = 0; // Initialize the score to 0
    this.animateId = null;
    this.gameIsOver = false;
    this.restartButton = document.getElementById("restart-btn");

    setInterval(() => {
      this.increaseScore();
    }, 1);

    this.setupRestartButton();
    this.setupMusic();
  }

  startGame() {
    this.landingPage.style.display = "none";
    this.gameOverPage.style.display = "none";
    this.easterEgg.style.display = "none";
    this.scoreCounter.style.display = "flex";
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

    this.playBackgroundMusic();
  }

  gameLoop() {
    if (this.gameIsOver) return;

    this.obstacles.forEach((currentObstacle) => {
      currentObstacle.move();
      if (this.player.didCollide(currentObstacle)) {
        this.gameIsOver = true;
        this.endGame();
      }
    });

    this.update();

    window.requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    this.player.updatePosition();
  }

  increaseScore() {
    this.score++;
    this.updateScoreDisplay();
  }

  updateScoreDisplay() {
    this.scoreCounter.textContent = `Score: ${this.score}`;
  }

  endGame() {
    this.gameIsOver = true;
    this.gameScreen.style.display = "none";
    this.gameOverPage.style.display = "flex";
    this.restartButton.style.display = "flex";

    const buttonContainer = document.createElement("div");
    buttonContainer.appendChild(this.restartButton);

    this.gameOverPage.innerHTML = "";
    this.gameOverPage.appendChild(buttonContainer);

    const scoreContainer = document.createElement("div");
    scoreContainer.textContent = `Score: ${this.score}`;
    scoreContainer.style.color = "white";
    scoreContainer.style.fontSize = "6em";
    scoreContainer.style.marginTop = "300px";
    scoreContainer.style.marginLeft = "700px";
    scoreContainer.style.fontFamily = "Impact, Charcoal, sans-serif";
    scoreContainer.style.opacity = "100";
    scoreContainer.style.padding = "50px";
    scoreContainer.style.borderRadius = "15px";
    scoreContainer.style.border = "solid 5px black";

    this.gameOverPage.appendChild(scoreContainer);

    if (this.player && this.player.element) {
      this.gameScreen.removeChild(this.player.element);
      this.player = null;
    }

    this.obstacles.forEach((obstacle) => {
      if (obstacle.element) {
        this.gameScreen.removeChild(obstacle.element);
      }
    });
    this.obstacles = null;
    this.gameScreen.style.display = "none";

    this.stopBackgroundMusic();
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
    this.resetScore();
  }

  resetScore() {
    this.score = 0;
    this.updateScoreDisplay();
  }

  setupMusic() {
    this.musicFile = "Game_assets/PiercingLight.mp3";
    this.musicSource = document.createElement("audio");
    this.musicSource.src = this.musicFile;
    this.backgroundMusic = new Audio(this.musicFile);
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.05;
  }

  playBackgroundMusic() {
    this.backgroundMusic.play();
  }

  stopBackgroundMusic() {
    this.backgroundMusic.pause();
    this.backgroundMusic.currentTime = 0;
  }
}
