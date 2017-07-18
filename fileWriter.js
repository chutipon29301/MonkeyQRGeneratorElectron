var fs = require('fs-extra');
var chalk = require('chalk');
var config = require('./config');
var global = require('./global');

var text = 'var config = {' +
    'runPort: ' + config.runPort +
    '}';

fs.writeFile('public/js/configPath.js', text);