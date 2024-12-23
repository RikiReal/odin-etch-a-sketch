const container = document.querySelector("#container");
const areaSize = 960;
container.setAttribute("style", `width: ${areaSize}px; height: ${areaSize}px;`);
let sides = 16;

function drawGrid(sides, areaSize) {
  let squareSize = areaSize / sides;

  for (let i = 0; i < sides * sides; i++) {
    const square = document.createElement("div");
    square.setAttribute(
      "style",
      `width: ${squareSize}px; height: ${squareSize}px; margin: 0; box-sizing: border-box; border: 1px solid black; opacity: 1; background-color: gray`
    );
    square.addEventListener("mouseover", handleMouseHover);
    container.appendChild(square);
  }

  function handleMouseHover(e) {
    const backgroundColor = e.target.style.backgroundColor;
    if (backgroundColor == "gray") {
      const color = randomColorRGB();
      e.target.style.backgroundColor = color;
      return;
    }

    e.target.style.opacity = e.target.style.opacity - 0.1;
  }
}

function resetGrid() {
  while (container.firstChild) {
    // The list is LIVE so it will re-index each call
    // https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes#remove_all_children_from_a_node
    container.removeChild(container.firstChild);
  }
}

function randomColorRGB() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const yellow = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${yellow})`;
}

const gridButton = document.querySelector("#grid-button");
gridButton.addEventListener("click", handleBtnClick);
function handleBtnClick(e) {
  let userInput = NaN;
  let message = "How many squares per side? (Max 100)";
  while (!userInput) {
    userInput = Number.parseInt(prompt(message, "16"));
    if (Number.isNaN(userInput) || !Number.isInteger(userInput)) {
      message = "Please only Integers!";
    }
    if (userInput > 100 || userInput <= 0) {
      message = "Only numbers between 1 and 100 (inkl)";
      // Reset userInput so loop continues
      userInput = NaN;
    }
  }
  sides = userInput;
  resetGrid();
  drawGrid(sides, areaSize);
}

drawGrid(sides, areaSize);
