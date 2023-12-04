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
  }

  startGame() {
    this.landingPage.style.display = "none";
    this.gameOverPage.style.display = "none";
    this.easterEgg.style.display = "none";
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
