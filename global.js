var config = require('./config.js');

function log(text){
    if(config.debugMode){
        console.log(text);
    }
}


module.exports = {
    log: log
}