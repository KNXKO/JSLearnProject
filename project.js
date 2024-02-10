const prompt = require("prompt-sync")();

// Slot machine
const ROWS = 3;
const COLS = 3;

const SYMBOLS = {
  "🍒": { value: 5, probability: 0.1 },
  "🍊": { value: 4, probability: 0.2 },
  "🍋": { value: 3, probability: 0.3 },
  "🍇": { value: 2, probability: 0.4 },
};

const getRandomSymbol = () => {
  const symbols = Object.keys(SYMBOLS);
  const probabilities = Object.values(SYMBOLS).map(
    (symbol) => symbol.probability
  );
  const randomIndex = weightedRandom(probabilities);
  return symbols[randomIndex];
};

const weightedRandom = (probabilities) => {
  const total = probabilities.reduce((acc, val) => acc + val);
  const threshold = Math.random() * total;
  let sum = 0;
  for (let i = 0; i < probabilities.length; i++) {
    sum += probabilities[i];
    if (sum >= threshold) {
      return i;
    }
  }
};

const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a deposit amount: ");
    const numberDepositAmount = parseFloat(depositAmount);

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log("Invalid deposit amount, try again");
    } else {
      return numberDepositAmount;
    }
  }
};

const getNumberOfLines = () => {
  while (true) {
    const lines = prompt("Enter the number of lines to bet on (1-3): ");
    const numberOfLines = parseFloat(lines);

    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log("Invalid number of lines, try again");
    } else {
      return numberOfLines;
    }
  }
};

const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter a bet per line: ");
    const numberBet = parseFloat(bet);

    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
      console.log("Invalid total bet, try again");
    } else {
      return numberBet;
    }
  }
};

const spin = () => {
  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    for (let j = 0; j < ROWS; j++) {
      reels[i].push(getRandomSymbol());
    }
  }
  return reels;
};

const transpose = (reels) => {
  const rows = [];

  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i !== row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

const getWinnings = (rows, bet, lines) => {
  let winnings = 0;

  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol !== symbols[0]) {
        allSame = false;
        break;
      }
    }

    if (allSame) {
      winnings += bet * SYMBOLS[symbols[0]].value;
    }
  }
  return winnings;
};

const game = () => {
  let balance = deposit();
  while (true) {
    console.log("You have " + balance + "$");
    const numberOfLines = getNumberOfLines();
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, bet, numberOfLines);
    balance += winnings;
    console.log("You win " + winnings.toString() + "$");

    if (balance <= 0) {
      console.log("You have no money left");
      break;
    }
    const playAgain = prompt("Do you want to play again? (y/n): ");
    if (playAgain !== "y") {
      break;
    }
  }
};

game();