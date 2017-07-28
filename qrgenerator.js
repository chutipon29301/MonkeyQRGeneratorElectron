var qrcode = require('qrcode');
var bodyParser = require('body-parser');
var rp = require('request-promise');
var fs = require('fs-extra');
var global = require('./global');
var config = require('./config');

var jsonParser = bodyParser.json();

var urlencodedParser = bodyParser.urlencoded({ extended: true });

module.exports = function (app) {

    app.post('/createQRCode', function (req, res) {
        var isErr = false;
        global.cyan('[POST Request] "/createQRCode"\tbody => ');
        global.log(req.body);
        global.cyan('Running on platform: ' + process.platform);

        if (req.body.courseName === null || req.body.tutorName === null) return res.status(400).send('Bad Request');

        var options = {
            method: 'POST',
            uri: 'http://localhost:' + config.runPort + '/keyStudentPath',
            body: {
                courseName: req.body.courseName
            },
            json: true
        };

        var dir;
        if (config.debugMode) {
            dir = config.debugModeQRSavePath + '/QROUT';
        } else {
            dir = ((platform.process === 'darwin') ? config.darwinFilePath : config.win32FilePath) + req.body.tutorName + '/QROUT';
        }

        

        fs.ensureDir(dir)
            .then(() => {
                console.log('success!')
                rp(options)
                    .then(function (parsedBody) {
                        qrcode.toFile(dir + '/'+ req.body.courseName +'.png', parsedBody, {
                            color: {
                                dark: '#000',
                                light: '#FFF'
                            }
                        }, function (err) {
                            if (err) {
                                isErr = true;
                                // return err;
                            }
                            global.green('[POST Request] "/createQRCode"\tFile has beed saved');
                        });
                    })
                    .catch(function (err) {
                        global.red(err);
                        if (err) {
                            isErr = true;
                            // return err;
                        }
                    })
                    .finally(function () {
                        if (!isErr) {
                            return res.sendStatus(200);
                        } else {
                            return res.sendStatus(400);
                        }
                    });
            })
            .catch(err => {
                console.error(err)
            });


    });
}