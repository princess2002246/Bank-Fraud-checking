#Bank management system-requirements

# create a bank account management system that allowers users to deposit,withdraw and transfer money while detecting suspicious or fraudulent activities.

#DEPOSIT
user must be able to deposit money into their account and see the balance increases

#WITHDRAW MONEY 
User must be able to withdraw money from their account .
user can not withdraw more money than their available balance 

#TRANSFER
User must be able to transfer money to another user account
the user must have enough funds to make any transfer
the sender balance must decrease after the transfer
the receiver balance must increase

#FRAUD DETECTION

#Insuffient funds
Reject a withdrawal or transfer when the user does not have enough money on the account.

#rapid withdrawl
if a user attempts more than 3 withdrawal within 10 seconds, the system must block suspicious activity

#Unusual spednding
The system must keep track of users average trasaction size.
if a new transaction is significantly larger than the users normal transaction amount, the system must flag or block

#TESTING REQUIREMENTS
successful deposit
successful withdrawl
insufficient funds
successful transfer
transfer with insufficient  funds
rapid withdrwals
unusual transaction amount
normal transactions

----------- ACTIVITY SOLUTION -----------
START

// Create the bank accounts
Create Alice's account with R10 000
Create Bob's account with R5 000

// Ask the user what they want to do
Display:
    1. Deposit money
    2. Withdraw money
    3. Transfer money
    4. Exit

Ask the user to choose an option

IF the user chooses Deposit THEN

    Ask how much money the user wants to deposit.

    IF the amount is greater than 0 THEN

        Add the money to the user's account.

        Record the transaction.

        Display "Deposit successful."

        Display the new balance.

    ELSE

        Display "Invalid deposit amount."

    END IF

ELSE IF the user chooses Withdraw THEN

    Ask how much money the user wants to withdraw.

    Check the user's balance.

    IF the user does not have enough money THEN

        Display "Insufficient funds."

        Do not remove any money.

    ELSE

        // Check for rapid withdrawals
        Count how many withdrawals the user
        has made within the last 10 seconds.

        IF the user has already made 3 withdrawals
        within 10 seconds THEN

            Display "Withdrawal blocked."

            Display "Suspicious activity detected."

        ELSE

            // Check for unusual spending
            Look at the user's previous transactions.

            Calculate the user's average transaction amount.

            IF the withdrawal is more than
            5 times the average transaction amount THEN

                Display "Unusual transaction detected."

                Display "Withdrawal blocked."

            ELSE

                Remove the money from the user's account.

                Record the withdrawal.

                Display "Withdrawal successful."

                Display the new balance.

            END IF

        END IF

    END IF

ELSE IF the user chooses Transfer THEN

    Ask who they want to send money to.

    Ask how much money they want to send.

    Check if the receiver has an account.

    IF the receiver does not have an account THEN

        Display "Receiver account not found."

    ELSE

        Check the sender's balance.

        IF the sender does not have enough money THEN

            Display "Insufficient funds."

            Do not transfer any money.

        ELSE

            // Check for unusual spending
            Look at the sender's previous transactions.

            Calculate the sender's average transaction amount.

            IF the transfer is more than
            5 times the average transaction amount THEN

                Display "Unusual transaction detected."

                Display "Transfer blocked."

            ELSE

                Remove the money from the sender's account.

                Add the money to the receiver's account.

                Record the transfer.

                Display the sender's new balance.

                Display the receiver's new balance.

                Display "Transfer successful."

            END IF

        END IF

    END IF

ELSE IF the user chooses Exit THEN

    Display "Thank you for using the bank."

ELSE

    Display "Invalid option."

END IF

 --------- TESTING ---------

// Test 1: Successful deposit

Give Alice R1 000.

Deposit R500.

IF Alice now has R1 500 THEN

    Display "Successful deposit: PASSED."

ELSE

    Display "Successful deposit: FAILED."

END IF

// Test 2: Successful withdrawal

Give Alice R1 000.

Withdraw R300.

IF Alice now has R700 THEN

    Display "Successful withdrawal: PASSED."

ELSE

    Display "Successful withdrawal: FAILED."

END IF

// Test 3: Insufficient funds

Give Alice R1 000.

Try to withdraw R2 000.

IF the withdrawal is rejected
AND Alice still has R1 000 THEN

    Display "Insufficient funds: PASSED."

ELSE

    Display "Insufficient funds: FAILED."

END IF

// Test 4: Successful transfer

Give Alice R1 000.

Give Bob R500.

Alice transfers R300 to Bob.

IF Alice has R700
AND Bob has R800 THEN

    Display "Successful transfer: PASSED."

ELSE

    Display "Successful transfer: FAILED."

END IF

// Test 5: Transfer with insufficient funds

Give Alice R1 000.

Give Bob R500.

Alice tries to transfer R2 000 to Bob.

IF the transfer is rejected
AND Alice still has R1 000
AND Bob still has R500 THEN

    Display "Transfer with insufficient funds: PASSED."

ELSE

    Display "Transfer with insufficient funds: FAILED."

END IF

// Test 6: Rapid withdrawals

Give Alice R5 000.

Alice withdraws R100.

Alice withdraws R100.

Alice withdraws R100.

Alice tries to withdraw another R100
within 10 seconds.

IF the fourth withdrawal is blocked THEN

    Display "Rapid withdrawals: PASSED."

ELSE

    Display "Rapid withdrawals: FAILED."

END IF

// Test 7: Unusual transaction

Give Alice previous transactions:

    R100
    R200
    R300

Calculate Alice's average transaction amount.

The average is R200.

Five times the average is R1 000.

Alice tries to make a R1 001 transaction.

IF the transaction is flagged or blocked THEN

    Display "Unusual transaction: PASSED."

ELSE

    Display "Unusual transaction: FAILED."

END IF

// Test 8: Normal transaction

Give Alice previous transactions:

    R100
    R200
    R300

Calculate Alice's average transaction amount.

The average is R200.

Five times the average is R1 000.

Alice makes a R300 transaction.

IF the transaction is allowed THEN

    Display "Normal transaction: PASSED."

ELSE

    Display "Normal transaction: FAILED."

END IF

Display "All tests completed."

END
