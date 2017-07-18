var fs = require('fs-extra');
var chalk = require('chalk');
var config = require('./config');
var global = require('./global');

var text = 'var config = {' +
    'runPort: ' + config.runPort + ',\n' +
    'availableSubjectList: [' + Object.keys(config.subjectFullName) + '],\n' +
    'availableSetList: [' + config.availableSetList + '],\n' +
    'availableSubsetList: [' + config.availableSubsetList + '],\n' +
    'availableSubscriptList: [' + config.availableSubscriptList + ']\n' +
    '}';

fs.writeFile('public/js/configPath.js', text);