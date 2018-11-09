document.getElementById("start").addEventListener("click", start);

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
  }
  move(key) {
    switch (key) {
      case this.keys[0]:
        if (this.position[1] > 200) {
          this.position[1] -= 10;
        }
        break;
      case this.keys[1]:
        if (this.position[1] < window.innerWidth - 200) {
          this.position[0] += 10;
        }
        this.div.setAttribute("src", `../images/${this.name}-right.png`);
        this.direction = "right";
        break;
      case this.keys[2]:
        this.position[1] += 10;
        break;
      case this.keys[3]:
        this.position[0] -= 10;
        this.div.setAttribute("src", `../images/${this.name}-left.png`);
        this.direction = "left";
        break;
      case this.keys[4]:
        if (this.direction == "left") {
          this.punchLeft();
        } else {
          this.punchRight();
        }
        break;
    }
    this.div.style.left = `${this.position[0]}px`;
    this.div.style.top = `${this.position[1]}px`;
    this.div.style.zIndex = this.position[1];
  }
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
  punchRight() {
    this.div.setAttribute("src", `../images/${this.name}-right-punch.png`);
  }
  punchLeft() {
    this.div.setAttribute("src", `../images/${this.name}-left-punch.png`);
  }
}

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

function start() {
  chicken = new player(
    "chicken",
    [200, 350],
    5,
    [87, 68, 83, 65, 67],
    document.getElementById("chicken")
  );
  peter = new player(
    "peter",
    [900, 350],
    5,
    [38, 39, 40, 37, 18],
    document.getElementById("peter")
  );
  peter.move();
  chicken.move();
}

// start();
