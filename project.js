// 1. Deposit some money
// 2.Determine number of lines to bet on
// 3. Collect bet amount
// 4. Spin slot
// 5. Check if user won
// 6. Giver user the money
// 7. Play again
const prompt = require("prompt-sync")();

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
const depositAmount = deposit();
