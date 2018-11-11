let startButton = document.getElementById("start");
let winner = document.getElementById("winner");
startButton.addEventListener("click", start);

class player {
  constructor(name, position, health, keys, div, direction) {
    this.name = name;
    this.position = position;
    this.health = health;
    //keys takes an array [up, right, down, left, punch]
    this.keys = keys;
    this.div = div;
    this.direction = direction;
    this.div.style.display = "inline-block";
    this.healthImg = document.getElementById(`${this.name}-health`);
  }
  //move player dependin on which key is pressed
  move(key) {
    switch (key) {
      case this.keys[0]:
        if (this.position[1] > 43) {
          this.position[1] -= 7;
        }
        break;
      case this.keys[1]:
        if (this.position[0] < 75) {
          this.position[0] += 2;
        }
        this.div.setAttribute("src", `../images/${this.name}-right.png`);
        this.direction = "right";
        break;
      case this.keys[2]:
        if (this.position[1] < 57) {
          this.position[1] += 7;
        }
        break;
      case this.keys[3]:
        if (this.position[0] > 0) {
          this.position[0] -= 2;
        }
        this.div.setAttribute("src", `../images/${this.name}-left.png`);
        this.direction = "left";
        break;
      case this.keys[4]:
        this.punch();
        break;
    }
    this.div.style.left = `${this.position[0]}vw`;
    this.div.style.top = `${this.position[1]}vh`;
    this.div.style.zIndex = this.position[1];
  }
  //resets player image after punch
  reset(key) {
    switch (key) {
      case this.keys[4]:
        if (this.direction == "left") {
          this.div.setAttribute("src", `../images/${this.name}-left.png`);
        } else {
          this.div.setAttribute("src", `../images/${this.name}-right.png`);
        }
    }
  }
  checkForWinner() {
    if (this.opponent.health == 0) {
      //hide players
      this.div.style.display = "none";
      this.opponent.div.style.display = "none";
      //show winner
      document
        .querySelector("#winner img")
        .setAttribute("src", `images/${this.name}-wins.png`);
      document.querySelector("#winner h2").textContent = `${this.name} wins!`;
      //hide "click here button"
      winner.style.display = "flex";
      startButton.style.display = "none";
    }
  }
  punch() {
    if (this.opponent.health > 0 && this.health > 0) {
      if (this.direction == "right") {
        this.div.setAttribute("src", `../images/${this.name}-right-punch.png`);
        if (
          this.position[1] == this.opponent.position[1] &&
          this.position[0] > this.opponent.position[0] - 13 &&
          this.position[0] < this.opponent.position[0] - 9
        ) {
          this.div.style.zIndex++;
          this.opponent.health--;
          this.opponent.healthImg.setAttribute(
            "src",
            `../images/health-${this.opponent.health}.png`
          );
        }
      } else {
        this.div.setAttribute("src", `../images/${this.name}-left-punch.png`);
        if (
          this.position[1] == this.opponent.position[1] &&
          this.position[0] > this.opponent.position[0] + 9 &&
          this.position[0] < this.opponent.position[0] + 13
        ) {
          this.div.style.zIndex++;
          this.opponent.health--;
          this.opponent.healthImg.setAttribute(
            "src",
            `../images/health-${this.opponent.health}.png`
          );
        }
      }
      this.checkForWinner();
    }
  }
}

//listens for keyup and keydown and sends keys to move and reset player methods
let key;
window.onkeydown = function(e) {
  key = e.keyCode;
  peter.move(key);
  chicken.move(key);
};
window.onkeyup = function(e) {
  key = e.keyCode;
  chicken.reset(key);
  peter.reset(key);
};

// initialized players and starts the game!
function start() {
  peter = new player(
    "peter",
    [65, 50],
    11,
    [38, 39, 40, 37, 18],
    document.getElementById("peter"),
    "left"
  );
  chicken = new player(
    "chicken",
    [15, 50],
    11,
    [87, 68, 83, 65, 67],
    document.getElementById("chicken"),
    "right"
  );
  peter.opponent = chicken;
  chicken.opponent = peter;
  peter.healthImg.setAttribute("src", `../images/health-11.png`);
  chicken.healthImg.setAttribute("src", `../images/health-11.png`);
  peter.move();
  chicken.move();
}

function restart() {
  winner.style.display = "none";
  startButton.style.display = "inline-block";
  start();
}
document.getElementById("restart").addEventListener("click", restart);
