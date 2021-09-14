function createAccount(pin, amount=0) {
    return {
        pin,
        amount,
        checkBalance(inputPin) {
            if(inputPin === pin) return `$${amount}`;
            return "Invalid PIN."
        },
        deposit(inputPin, addAmount){
            if(inputPin !== pin) return "Invalid PIN.";
            amount += addAmount;
            return `Succesfully deposited $${addAmount}. Current balance: $${amount}.`;
        },
        withdraw(inputPin, decAmount){
            if(inputPin !== pin) return "Invalid PIN.";
            const newAmount = amount - decAmount;
            if(newAmount < 0) return "Withdrawal amount exceeds account balance. Transaction cancelled.";
            amount = newAmount;
            return `Succesfully withdrew $${decAmount}. Current balance: $${amount}.`;
        },
        changePin(inputPin, newPin){
            if(inputPin !== pin) return "Invalid PIN.";
            pin = newPin;
            return "PIN successfully changed!";
        }
    }
}

module.exports = { createAccount };
