#! /usr/bin/env node
import chalkAnimation from 'chalk-animation';
import inquirer from 'inquirer';
const sleep = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });
};
async function invitation() {
    let rainbowText = chalkAnimation.rainbow("My Bank Account");
    await sleep();
    rainbowText.stop();
}
class BankAccount {
    balance;
    accountNumber;
    constructor(balance, accountNumber) {
        this.balance = balance;
        this.accountNumber = accountNumber;
    }
    add(amount) {
        this.balance += amount;
        console.log(`Deposit of ${amount} successful. Current balance: ${this.balance}`);
    }
    taken(amount) {
        if (amount > this.balance) {
            console.log(`Insufficient balance. Current balance: ${this.balance}`);
        }
        else {
            this.balance -= amount;
            console.log(`Withdrawl of ${amount} successful. Current balance: ${this.balance}`);
        }
    }
    checkBalance() {
        console.log(`Current balance: ${this.balance}`);
    }
}
inquirer.prompt([
    {
        type: 'input',
        name: 'initialBalance',
        message: 'Enter initial balance:',
    },
    {
        type: 'input',
        name: 'accountNumber',
        message: 'Enter account number:',
    }
])
    .then((answers) => {
    const initialBalance = parseFloat(answers.initialBalance);
    const accountNumber = parseInt(answers.accountNumber);
    const account = new BankAccount(initialBalance, accountNumber);
    inquirer.prompt([
        {
            type: 'list',
            name: 'operation',
            message: 'What operation do you want to perform?',
            choices: ['Check Balance', 'add', 'withdraw'],
        }
    ])
        .then((answers) => {
        switch (answers.operation) {
            case 'Check Balance':
                account.checkBalance();
                break;
            case 'add':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'amount',
                        message: 'Enter amount to add:',
                    }
                ])
                    .then((answers) => {
                    const amount = parseFloat(answers.amount);
                    account.add(amount);
                });
                break;
            case 'withdraw':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'amount',
                        message: 'Enter amount to withdraw:',
                    }
                ])
                    .then((answers) => {
                    const amount = parseFloat(answers.amount);
                    account.taken(amount);
                });
                break;
        }
    });
});
await invitation();
