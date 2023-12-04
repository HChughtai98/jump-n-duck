class Game {
  constructor() {
    this.landingPage = document.getElementById("landingPage");
    this.gameScreen = document.getElementById("gameScreen");
    this.gameOverPage = document.getElementById("endScreenPage");
    this.height = 923;
    this.width = 1920;
    this.y = 500;
    this.x = 500;
    this.player = null;
    this.obstacles = [];
    this.animateId = null;
  }

  startGame() {
    this.landingPage.style.display = "none";
    this.gameOverPage.style.display = "none";
    this.gameScreen.style.display = "flex";

    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    this.player = new Player(this.gameScreen);
    this.obstacles.push(new Obstacle(this.gameScreen));
  }

  gameLoop() {
    if (this.gameIsOver) return;

    this.update();

    window.requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    this.player.updatePosition();
  }
}
