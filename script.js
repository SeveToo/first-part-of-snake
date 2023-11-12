const gridContainer = document.querySelector(".gridContainer");
const buttons = document.querySelectorAll(".b");

// Size of game
let ElementsInRow = 20; // Elements in row
let ElementsInColumns = 20; // Elements in column

let width = ElementsInColumns * 40 + "px";
let height = ElementsInRow * 40 + "px";

gridContainer.style.width = width;
gridContainer.style.height = height;

let allElements = ElementsInRow * ElementsInColumns;

// Function to random numbers
let rand = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// snake default long
long = 3;

// Snake Defoult Position
x = rand(0, ElementsInRow - 1);
y = rand(0, ElementsInColumns - 1);

// First apple
let xApple, yApple;

// Build a board
let rowNr = 0,
  columnNr = 0;
for (let i = 0; i < allElements; i++) {
  if (columnNr == ElementsInColumns) columnNr = 0;
  if (i % ElementsInColumns == 0 && i >= ElementsInColumns) rowNr++;
  let el = document.createElement("div");
  el.classList.add("gridContent");
  el.setAttribute("date-nr", i);
  el.setAttribute("date-row", rowNr);
  el.setAttribute("date-column", columnNr);
  el.textContent = rowNr + "," + columnNr;
  gridContainer.append(el);
  columnNr++;
}

const anyBlock = document.querySelectorAll(".gridContent");

// Updating Position
function updatePosition() {
  const el = document.querySelector(`[date-row="${y}"][date-column="${x}"] `);
  el.classList.add("head");
  el.setAttribute("date-pos", 1);
  anyBlock.forEach((el) => {
    if (el.getAttribute("date-pos") > 0) {
      el.classList.add("activePos");
      el.setAttribute("date-pos", Number(el.getAttribute("date-pos")) + 1);
      if (el.getAttribute("date-pos") > 2) el.classList.remove("head");
      // console.log(el.getAttribute("date-pos"));
      if (el.getAttribute("date-pos") >= long) {
        el.classList.remove("activePos");
      }
    }
  });
}

updatePosition();

// KeyBoard click
document.body.onkeydown = function (el) {
  go(el.key);
};

// Moving function
function go(el) {
  if (
    el == "ArrowLeft" ||
    el == "ArrowUp" ||
    el == "ArrowDown" ||
    el == "ArrowRight"
  ) {
    buttons.forEach((el) => {
      el.classList.remove("activeButton");
    });
    switch (el) {
      case "ArrowLeft":
        buttons[0].classList.add("activeButton");
        if (x - 1 >= 0) x--;
        else x = ElementsInRow - 1;
        updatePosition();
        break;
      case "ArrowUp":
        buttons[1].classList.add("activeButton");
        if (y - 1 >= 0) y--;
        else y = ElementsInColumns - 1;
        updatePosition();
        break;
      case "ArrowDown":
        buttons[2].classList.add("activeButton");
        if (y + 1 < ElementsInColumns) y++;
        else y = 0;
        updatePosition();
        break;
      case "ArrowRight":
        buttons[3].classList.add("activeButton");
        if (x + 1 < ElementsInRow) x++;
        else x = 0;
        updatePosition();
        break;
    }
  }
  checkApple();
}

function checkApple() {
  // console.log(x, "==", xApple, " | ", y, "==", yApple);
  if (x == xApple && y == yApple) {
    // console.log("gotIt");
    long++;
    const el = document.querySelector(
      `[date-row="${yApple}"][date-column="${xApple}"] `
    );
    el.classList.remove("apple");
    apples();
  }
}

// Keyboard Onclick
document.body.onkeyup = function (el) {
  if (
    el.key == "ArrowLeft" ||
    el.key == "ArrowUp" ||
    el.key == "ArrowDown" ||
    el.key == "ArrowRight"
  ) {
    buttons.forEach((el) => {
      el.classList.remove("activeButton");
    });
  }
};

// Button onclick
buttons.forEach(
  (el) =>
    (el.onclick = () => {
      // console.log(el.classList[0]);
      go(el.classList[0]);
      setTimeout(() => {
        el.classList.remove("activeButton");
      }, 100);
    })
);
apples();

// Apple generator
function apples() {
  xApple = rand(0, ElementsInRow - 1);
  yApple = rand(0, ElementsInColumns - 1);
  const el = document.querySelector(
    `[date-row="${yApple}"][date-column="${xApple}"] `
  );
  el.classList.add("apple");
}
