class Player {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.x = 100;
    this.y = 45;
    this.height = 110;
    this.width = 90;
    this.directionX = 0;
    this.directionY = 0;

    this.element = document.createElement("img");
    this.element.src = "../Game_assets/playerModel.png";
    this.element.style.position = "absolute";
    this.element.classList.add("playerModel");

    this.element.style.width = `${this.width}px`;

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp") {
        this.jump();
      } else if (e.key === "ArrowDown") {
        this.crouch();
      }
    });

    this.gameScreen.appendChild(this.element);

    this.isJumping = false;
  }

  updatePosition() {
    this.element.style.left = `${this.x}px`;
    this.element.style.bottom = `${this.y}px`;
    this.element.style.height = `${this.height}px`;
  }

  jump() {
    this.element.style.transform = "translateY(-130px)";
    this.isJumping = true;
    setTimeout(() => {
      this.element.style.transform = "translateY(0)";
      this.isJumping = false;
    }, 200);
  }

  crouch() {
    if (!this.isJumping) {
      this.height = 60;
      setTimeout(() => {
        this.height = 110;
      }, 200);
    }
  }
}
