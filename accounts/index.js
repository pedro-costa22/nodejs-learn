const inquirer = require('inquirer');
const chalk = require('chalk');

const fs = require('fs');

const operation = () => {
    inquirer.prompt([
        {
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer ?',
        choices: [
                'Criar Conta',
                'Consultar Saldo',
                'Depositar',
                'Sacar',
                'sair'
            ]
        }
    ])
    .then(answer => {
        const action = answer['action'];
        
        if(action === 'Criar Conta') return createAccount();
        if(action === 'Consultar Saldo') return getAccountBalance();
        if(action === 'Depositar') return deposit();
        if(action === 'Sacar') return withdraw();
        if(action === 'Sair') {
            console.log(chalk.bgBlue.black(`Obrigado por usar o Accounts`));
            process.exit();
        }   

    })
    .catch(err => console.log(err));
};

operation();

//create an account
const createAccount = () => {
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco!'));
    console.log(chalk.green('Defina as opções da sua conta a seguir'));
    buildAccount();
};

const buildAccount = () => {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Digite um nome para a sua conta: '
        }
    ])
    .then(answer => {
        const accountName = answer['accountName'];

        console.info(accountName);

        if(!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts');
        }

        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed.black('Esta conta já existe, escolha outro nome'));
            buildAccount();
            return;
        }

        fs.writeFileSync(`accounts/${accountName}.json`, 
            '{"balance": "0"}',
            function (err) {
                console.log(err)
            },
        );

        console.log(chalk.green('Parabéns, a sua conta foi criada!'));
        operation();
    })
    .catch(err => console.log(err));
}


//add an amount to user account
const deposit = () => {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta? ',
        },
    ])
    .then(answer => {
        const accountName = answer['accountName'];

        if(!checkAccount(accountName)) return deposit();

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quanto você deseja depositar ?:'
            },
        ])
        .then(answer => {
            const amount = answer['amount'];

            addAmount(accountName, amount);
            operation();
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

//show account balance
const getAccountBalance = () => {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?:'
        },
    ])
    .then(answer => {
        const accountName = answer['accountName'];

        if(!checkAccount(accountName)) return getAccountBalance();

        const accountData = getAccount(accountName);
        console.log(chalk.bgBlue.black(
            `Olá o saldo da sua conta é de R$${accountData.balance}`,
        ))
        operation();
    })
    .catch(err => console.log(err));
}

//withdraw
const withdraw = () => {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta: '
        }
    ])
    .then(answer => {
        const accountName = answer['accountName'];

        if(!checkAccount(accountName)) return withdraw();

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quanto você deseja sacar ?:'
            }
        ])
        .then(answer => {
            const amount = answer['amount'];

            removeAmout(accountName, amount);
            operation();
        })
        .catch(err => console.log(err));

    })
    .catch(err => console.log(err));
}

//helpers
const checkAccount = (accountName) => {
    if(!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black('Está conta não existe, escolha outro nome'));
        return false;
    };

    return true;
}

const addAmount = (accountName, amount) => {
    const accountData = getAccount(accountName);

    if(!amount) {
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'));
        return deposit();
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);
    fs.writeFileSync(`accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function(err) {
            console.log(err);
        }
    )

    console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta`));
}

const getAccount = (accountName) => {
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf-8',
        flag: 'r',
    });

    return JSON.parse(accountJSON);
}

const removeAmout = (accountName, amount) => {
    const accountData = getAccount(accountName);

    if(!amount) return console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'));

    if(accountData.balance < amount) return console.log(chalk.bgRed.black('Valor indisponível'));

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount);

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function(err) {
            console.log(err);
        }
    )

    console.log(chalk.green(`Foi realizado um saque de  R${amount} da sua conta`));
    
}