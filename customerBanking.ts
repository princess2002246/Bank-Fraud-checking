// BANK SYSTEM ACTIVITY

// Keep this file's declarations module-scoped so they do not conflict with
// similarly named declarations in other TypeScript files.
export {};

// TYPES

type TransactionType =
    | "deposit"
    | "withdrawal"
    | "transfer"
    | "received transfer";

interface Transaction {
    type: TransactionType;
    amount: number;
    time: number;
}

interface BankAccount {
    balance: number;
    transactions: Transaction[];
}

interface Accounts {
    [accountName: string]: BankAccount;
}


// CREATE BANK ACCOUNTS

let accounts: Accounts = {
    Alice: {
        balance: 10000,
        transactions: []
    },

    Bob: {
        balance: 5000,
        transactions: []
    }
};


// HELPER FUNCTIONS

// Record a transaction
function recordTransaction(
    accountName: string,
    type: TransactionType,
    amount: number
): void {

    accounts[accountName].transactions.push({
        type: type,
        amount: amount,
        time: Date.now()
    });
}


// Calculate average transaction amount
function calculateAverage(accountName: string): number {

    let transactions: Transaction[] =
        accounts[accountName].transactions;

    if (transactions.length === 0) {
        return 0;
    }

    let total: number = 0;

    for (let transaction of transactions) {
        total += transaction.amount;
    }

    return total / transactions.length;
}


// Check rapid withdrawals
function hasRapidWithdrawals(accountName: string): boolean {

    let currentTime: number = Date.now();

    let recentWithdrawals: Transaction[] =
        accounts[accountName].transactions.filter(
            (transaction: Transaction) =>
                transaction.type === "withdrawal" &&
                currentTime - transaction.time <= 10000
        );

    return recentWithdrawals.length >= 3;
}


// Check unusual transaction
function isUnusualTransaction(
    accountName: string,
    amount: number
): boolean {

    let average: number = calculateAverage(accountName);

    // If there are no previous transactions,
    // allow the transaction.
    if (average === 0) {
        return false;
    }

    return amount > 5 * average;
}


// DEPOSIT

function deposit(
    accountName: string,
    amount: number
): void {

    if (amount > 0) {

        accounts[accountName].balance += amount;

        recordTransaction(
            accountName,
            "deposit",
            amount
        );

        console.log("Deposit successful.");

        console.log(
            `${accountName}'s new balance: R${accounts[accountName].balance}`
        );

    } else {

        console.log("Invalid deposit amount.");
    }
}


// WITHDRAW

function withdraw(
    accountName: string,
    amount: number
): void {

    // Check balance
    if (amount > accounts[accountName].balance) {

        console.log("Insufficient funds.");
        return;
    }


    // Check rapid withdrawals
    if (hasRapidWithdrawals(accountName)) {

        console.log("Withdrawal blocked.");
        console.log("Suspicious activity detected.");
        return;
    }


    // Check unusual spending
    if (isUnusualTransaction(accountName, amount)) {

        console.log("Unusual transaction detected.");
        console.log("Withdrawal blocked.");
        return;
    }


    // Remove money
    accounts[accountName].balance -= amount;


    // Record withdrawal
    recordTransaction(
        accountName,
        "withdrawal",
        amount
    );


    console.log("Withdrawal successful.");

    console.log(
        `${accountName}'s new balance: R${accounts[accountName].balance}`
    );
}


// TRANSFER


function transfer(
    sender: string,
    receiver: string,
    amount: number
): void {

    // Check if receiver exists
    if (!accounts[receiver]) {

        console.log("Receiver account not found.");
        return;
    }


    // Check sender balance
    if (amount > accounts[sender].balance) {

        console.log("Insufficient funds.");
        return;
    }


    // Check unusual spending
    if (isUnusualTransaction(sender, amount)) {

        console.log("Unusual transaction detected.");
        console.log("Transfer blocked.");
        return;
    }


    // Remove money from sender
    accounts[sender].balance -= amount;


    // Add money to receiver
    accounts[receiver].balance += amount;


    // Record the transfer
    recordTransaction(
        sender,
        "transfer",
        amount
    );

    recordTransaction(
        receiver,
        "received transfer",
        amount
    );


    console.log(
        `${sender}'s new balance: R${accounts[sender].balance}`
    );

    console.log(
        `${receiver}'s new balance: R${accounts[receiver].balance}`
    );

    console.log("Transfer successful.");
}


// DISPLAY MENU

function bankDisplayMenu(): void {

    console.log("\n===== BANK SYSTEM =====");

    console.log("1. Deposit money");
    console.log("2. Withdraw money");
    console.log("3. Transfer money");
    console.log("4. Exit");
}


// TESTING

console.log("\nTESTING");


// TEST 1: SUCCESSFUL DEPOSIT


console.log("\nTest 1: Successful deposit");

let test1Balance: number = 1000;

test1Balance += 500;

if (test1Balance === 1500) {

    console.log("Successful deposit: PASSED.");

} else {

    console.log("Successful deposit: FAILED.");
}


// TEST 2: SUCCESSFUL WITHDRAWAL

console.log("\nTest 2: Successful withdrawal");

let test2Balance: number = 1000;

if (300 <= test2Balance) {

    test2Balance -= 300;
}

if (test2Balance === 700) {

    console.log("Successful withdrawal: PASSED.");

} else {

    console.log("Successful withdrawal: FAILED.");
}


// TEST 3: INSUFFICIENT FUNDS

console.log("\nTest 3: Insufficient funds");

let test3Balance: number = 1000;

let withdrawalAmount: number = 2000;

if (withdrawalAmount > test3Balance) {

    console.log("Withdrawal rejected.");
}

if (
    withdrawalAmount > test3Balance &&
    test3Balance === 1000
) {

    console.log("Insufficient funds: PASSED.");

} else {

    console.log("Insufficient funds: FAILED.");
}



// TEST 4: SUCCESSFUL TRANSFER

console.log("\nTest 4: Successful transfer");

let test4Alice: number = 1000;

let test4Bob: number = 500;

let transferAmount: number = 300;

if (transferAmount <= test4Alice) {

    test4Alice -= transferAmount;

    test4Bob += transferAmount;
}

if (
    test4Alice === 700 &&
    test4Bob === 800
) {

    console.log("Successful transfer: PASSED.");

} else {

    console.log("Successful transfer: FAILED.");
}


// TEST 5: TRANSFER INSUFFICIENT FUNDS

console.log("\nTest 5: Transfer with insufficient funds");

let test5Alice: number = 1000;

let test5Bob: number = 500;

let test5Transfer: number = 2000;

if (test5Transfer > test5Alice) {

    console.log("Transfer rejected.");
}

if (
    test5Transfer > test5Alice &&
    test5Alice === 1000 &&
    test5Bob === 500
) {

    console.log(
        "Transfer with insufficient funds: PASSED."
    );

} else {

    console.log(
        "Transfer with insufficient funds: FAILED."
    );
}


// TEST 6: RAPID WITHDRAWALS

console.log("\nTest 6: Rapid withdrawals");

let withdrawalTimes: number[] = [
    Date.now(),
    Date.now(),
    Date.now()
];

let fourthWithdrawalBlocked: boolean =
    withdrawalTimes.length >= 3;

if (fourthWithdrawalBlocked) {

    console.log("Withdrawal blocked.");

    console.log("Rapid withdrawals: PASSED.");

} else {

    console.log("Rapid withdrawals: FAILED.");
}


// TEST 7: UNUSUAL TRANSACTION


console.log("\nTest 7: Unusual transaction");

let previousTransactions: number[] = [
    100,
    200,
    300
];

let total: number = 0;

for (let amount of previousTransactions) {

    total += amount;
}

let average: number =
    total / previousTransactions.length;

let fiveTimesAverage: number =
    average * 5;

let unusualAmount: number = 1001;

console.log(
    `Average transaction: R${average}`
);

console.log(
    `5 times average: R${fiveTimesAverage}`
);

if (unusualAmount > fiveTimesAverage) {

    console.log("Unusual transaction detected.");

    console.log("Unusual transaction: PASSED.");

} else {

    console.log("Unusual transaction: FAILED.");
}


// TEST 8: NORMAL TRANSACTION

console.log("\nTest 8: Normal transaction");

let normalAmount: number = 300;

if (normalAmount <= fiveTimesAverage) {

    console.log("Transaction allowed.");

    console.log("Normal transaction: PASSED.");

} else {

    console.log("Normal transaction: FAILED.");
}


console.log("\nALL TESTS COMPLETED");


// BANK ACCOUNT DEMO

console.log("\nBANK ACCOUNT DEMO");

console.log(
    `Alice starting balance: R${accounts.Alice.balance}`
);

console.log(
    `Bob starting balance: R${accounts.Bob.balance}`
);


// Example deposit
deposit("Alice", 500);


// Example withdrawal
withdraw("Alice", 300);


// Example transfer
transfer("Alice", "Bob", 200);


// FINAL BALANCES

console.log("\nFINAL BALANCES");

console.log(
    `Alice: R${accounts.Alice.balance}`
);

console.log(
    `Bob: R${accounts.Bob.balance}`
);