var bodyParser = require('body-parser');
var global = require('./global');

var jsonParser = bodyParser.json()

var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function (app) {
    app.use(bodyParser.json());

    app.post('/keyQRCodePath', function (req, res) {
        global.log();
        global.log(req.body);
        res.send('Hello World');
    });
}