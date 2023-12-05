class Obstacle {
  constructor(gameScreen, top) {
    this.gameScreen = gameScreen;
    this.width = 50;
    this.height = 40;
    this.left = 1880;
    /*this.top = Math.floor(Math.random() * (300 + 800)); */
    this.top = top;
    this.speed = 8;

    this.element = document.createElement("img");
    this.element.src = "../Game_assets/fireball.png";
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

  getLeftSide() {
    return this.left;
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.leftSide = this.getLeftSide();
  }
}
