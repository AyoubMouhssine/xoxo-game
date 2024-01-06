const btn__reset = document.querySelector(".btn__reset");
const message = document.querySelector(".message");
const game = document.querySelector(".game");

let numberOfRow = 3;
let numberOfSquare = 3;
let isPlaying = true;

let winners = [[], [], []];

function generateGameBody() {
  for (let i = 1; i <= numberOfRow; i++) {
    const row = document.createElement("div");
    row.className = `row row-${i}`;

    for (let j = 1; j <= numberOfSquare; j++) {
      const squareDiv = document.createElement("div");
      squareDiv.className = `square square-${i}-${j}`;

      row.appendChild(squareDiv);

      squareDiv.addEventListener("click", function () {
        if (isPlaying && this.innerHTML === "") {
          this.innerHTML = "X";
        }

        if (!isPlaying && this.innerHTML === "") {
          this.innerHTML = "O";
        }

        isPlaying = !isPlaying;

        winners[i - 1][j - 1] = this.innerHTML;
        checkForWinner();
      });
    }

    game.appendChild(row);
  }
}

window.onload = () => {
  generateGameBody();
};

const squares = document.querySelectorAll(".square");
btn__reset.addEventListener("click", resetGame);

function resetGame() {
  const squares = document.querySelectorAll(".square");

  squares.forEach((square) => (square.innerHTML = ""));

  winners = [[], [], []];

  message.innerHTML = "";

  isPlaying = true;
}

function checkForWinner() {
  // Check rows
  for (let i = 0; i < numberOfRow; i++) {
    if (checkRow(i, "X")) {
      displayWinner("Player X");
      return;
    } else if (checkRow(i, "O")) {
      displayWinner("Player O");
      return;
    }
  }

  // Check columns
  for (let j = 0; j < numberOfSquare; j++) {
    if (checkColumn(j, "X")) {
      displayWinner("Player X");
      return;
    } else if (checkColumn(j, "O")) {
      displayWinner("Player O");
      return;
    }
  }

  // Check diagonals
  if (checkDiagonal("X")) {
    displayWinner("Player X");
  } else if (checkDiagonal("O")) {
    displayWinner("Player O");
  }
}

function checkRow(row, player) {
  return (
    winners[row][0] === player &&
    winners[row][1] === player &&
    winners[row][2] === player
  );
}

function checkColumn(column, player) {
  return (
    winners[0][column] === player &&
    winners[1][column] === player &&
    winners[2][column] === player
  );
}

function checkDiagonal(player) {
  return (
    (winners[0][0] === player &&
      winners[1][1] === player &&
      winners[2][2] === player) ||
    (winners[0][2] === player &&
      winners[1][1] === player &&
      winners[2][0] === player)
  );
}

function displayWinner(player) {
  message.innerHTML = `The Winner Is <span class='winner'>${player}</span>`;
}
