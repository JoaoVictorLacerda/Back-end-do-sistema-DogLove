const chalk = require('chalk');

module.exports = (origem, message, error )=>{
    if(!error){
        console.log(chalk.bgRed(chalk.black(`${origem} -- ${message} `)));
    }else{
        console.log(chalk.bgGreen(chalk.black(`${origem} -- ${message}`)));
    }
}