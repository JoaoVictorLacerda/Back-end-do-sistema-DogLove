const express =require('express')
function initServer(){
    const app = require('../src/App')
    const database = require('../config/ConnectionDatabase')
    const os = require('os');
    const chalk = require('chalk');
    const PORT = process.env.PORT || 3000;

    app.getApp().listen(PORT,async ()=>{

        await database();

        const arch = os.arch()
        const plataform = os.platform()
        const type = os.type()
        const mem = os.totalmem()
        const cpus = os.cpus()

        console.log( chalk.bgBlue(chalk.black(` SERVICE RUNNING ON PORT: ${PORT} `)))
        console.log( chalk.bgBlue(chalk.black(` SO: ${type} ${plataform} ${arch} `)))
        console.log( chalk.bgBlue(chalk.black(` RAM: ${Math.floor(mem * (10 ** -9))} GB `)))
        console.log( chalk.bgBlue(chalk.black(` CORES: ${cpus.length} `)))
        console.log( chalk.bgBlue(chalk.black(` CPU: ${cpus[0].model} \n`)))
    })
}

initServer();

