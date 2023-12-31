class Obstacle {
  constructor(gameScreen, top) {
    this.gameScreen = gameScreen;
    this.width = 40;
    this.height = 30;
    this.left = 1880;
    this.top = top;
    this.speed = 9;

    this.element = document.createElement("img");
    this.element.src = "Game_assets/fireball.png";
    this.element.style.position = "absolute";
    this.element.classList.add("fireBall");

    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;

    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    this.gameScreen.appendChild(this.element);
  }

  move() {
    this.left -= 1 * this.speed;
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }
}
