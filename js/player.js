class Player {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.x = 100;
    this.y = 45;
    this.height = 160;
    this.width = 100;
    this.directionX = 0;
    this.directionY = 0;

    this.element = document.createElement("img");
    this.element.src = "Game_assets/playerModel.png";
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
    this.element.style.width = `${this.width}px`;
  }

  jump() {
    this.element.style.transform = "translateY(-130px)";
    this.isJumping = true;
    setTimeout(() => {
      this.element.style.transform = "translateY(0)";
      this.isJumping = false;
    }, 360);
  }

  crouch() {
    if (!this.isJumping) {
      this.height = 100;
      setTimeout(() => {
        this.height = 160;
      }, 320);
    }
  }

  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}
