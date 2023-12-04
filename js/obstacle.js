class Obstacle {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.width = 55;
    this.height = 40;
    this.left = Math.floor(Math.random() * (440 - this.width - 60) + 60);
    this.top = 800;

    this.element = document.createElement("img");
    this.element.src = "../Game_assets/fireball.png";
    this.element.style.position = "absolute";

    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;

    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    this.gameScreen.appendChild(this.element);
  }

  move() {
    this.right += 1;
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }
}
