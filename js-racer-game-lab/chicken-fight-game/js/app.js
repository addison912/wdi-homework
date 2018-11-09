class player {
  constructor(name, position, health, keys, div) {
    this.name = name;
    this.position = position;
    this.health = health;
    //keys takes an array [up, right, down, left, punch]
    this.keys = keys;
    this.div = div;
  }
  move(key) {
    console.log;
    switch (key) {
      case this.keys[0]:
        if (this.position[1] > 270) {
          this.position[1] -= 10;
        }
        break;
      case this.keys[1]:
        if (this.position[1] < window.innerWidth - 200) {
          this.position[0] += 10;
        }
        this.div.setAttribute("src", `../images/${this.name}-right.png`);
        direction = "right";
        break;
      case this.keys[2]:
        this.position[1] += 10;
        break;
      case this.keys[3]:
        this.position[0] -= 10;
        this.div.setAttribute("src", `../images/${this.name}-left.png`);
        direction = "left";
        break;
      case this.keys[4]:
        console.log(direction);
        direction == "left"
          ? this.div.setAttribute(
              "src",
              `../images/${this.name}-left-punch.png`
            )
          : this.div.setAttribute(
              "src",
              `../images/${this.name}-right-punch.png`
            );
        break;
    }
    this.div.style.left = `${this.position[0]}px`;
    this.div.style.top = `${this.position[1]}px`;
    this.div.style.zIndex = this.position[1];
  }
}

peter = new player(
  "peter",
  [900, 350],
  5,
  [38, 39, 40, 37, 93],
  document.getElementById("peter")
);

chicken = new player(
  "chicken",
  [200, 350],
  5,
  [87, 68, 83, 65, 16],
  document.getElementById("chicken")
);

peter.move();
chicken.move();

let key;
let direction;
window.onkeydown = function(e) {
  key = e.keyCode;
  peter.move(key);
  chicken.move(key);
};
