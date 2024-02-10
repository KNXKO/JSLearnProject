// 1. Deposit some money
// 2.Determine number of lines to bet on
// 3. Collect bet amount
// 4. Spin slot
// 5. Check if user won
// 6. Giver user the money
// 7. Play again

const prompt = require("prompt-sync")();

// Slot machine
const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  "🍒": 2,
  "🍊": 4,
  "🍋": 6,
  "🍇": 8,
};

const SYMBOL_VALUES = {
  "🍒": 5,
  "🍊": 4,
  "🍋": 3,
  "🍇": 2,
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
  const symbols = [];
  // Adding symbols to the array
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    // Adding symbols to the array based on the count
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [];
  // Filling reels with random symbols
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbols = reelSymbols[randomIndex];
      reels[i].push(selectedSymbols);
      reelSymbols.splice(randomIndex, 1);
    }
  }
  return reels;
};
const reels = spin();
console.log(reels);
let balance = deposit();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);
