var fs = require('fs-extra');
var chalk = require('chalk');
var config = require('./config');
var global = require('./global');

var fileList = fs.readdirSync(config.darwinFilePath);
global.log(fileList);

var text = 'var config = {' +
    'runPort: ' + config.runPort + ',\n' +
    'path: "http://localhost:' + config.runPort + '",\n' +
    'availableSubjectList: ' + JSON.stringify(Object.keys(config.subjectFullName)) + ',\n' +
    'availableLevelList:' + JSON.stringify(config.availableLevelList) + ',\n' +
    'availableSetList: ' + JSON.stringify(config.availableSetList) + ',\n' +
    'availableSubsetList: ' + JSON.stringify(config.availableSubsetList) + ',\n' +
    'availableSubscriptList: ' + JSON.stringify(config.availableSubscriptList) + ',\n' +
    'maxSetNo: ' + config.maxSetNo + ',\n' +
    'maxSubscriptNo: ' + config.maxSubscriptNo + ',\n' +
    'tutorName: ' + JSON.stringify(fileList) + '\n' +    
    '}';

fs.writeFile('public/js/configPath.js', text);