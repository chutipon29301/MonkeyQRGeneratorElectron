var bodyParser = require('body-parser');
var chalk = require('chalk');
var global = require('./global');
var config = require('./config')

var jsonParser = bodyParser.json()

var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function (app) {
    app.use(bodyParser.json());

    app.get('/availableSubject',function(req,res){
        res.status(200).send(config.subjectFullName);
    });
}