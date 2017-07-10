var chalk = require('chalk');
var config = require('./config.js');

function log(text) {
    if (config.debugMode) {
        console.log(text);
    }
}

function green(text) {
    if (config.debugMode) {
        console.log(chalk.green(text));
    }
}

function cyan(text) {
    if(config.debugMode){
        console.log(chalk.cyan(text));
    }
}

function red(text) {
    if(config.debugMode){
        console.log(chalk.red(text));
    }
}

function error(text) {
    if (config.debugMode) {
        console.error(text);
    }
}

module.exports = {
    log: log,
    green: green,
    cyan: cyan,
    red: red,
    error: error
}