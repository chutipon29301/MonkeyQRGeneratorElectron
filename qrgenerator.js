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

        var dir;
        if (config.debugMode && !config.inNetwork) {
            dir = config.debugModeQRSavePath + '/QROUT';
        } else {
            dir = ((process.platform === 'darwin') ? config.darwinFilePath : config.win32FilePath) + req.body.tutorName + '/QROUT';
        }

        fs.ensureDir(dir)
            .then(() => {
                rp({
                    method: 'POST',
                    uri: 'http://localhost:' + config.runPort + '/keyStudentPath',
                    body: {
                        courseName: req.body.courseName
                    },
                    json: true
                }).then(parsedBody => {
                    qrcode.toFile(dir + '/' + req.body.courseName.substring(0, req.body.courseName.indexOf('('))
                        + 'HOTKEY' + req.body.courseName.substring(req.body.courseName.indexOf('(')) + '.png', parsedBody, {
                            color: {
                                dark: '#000',
                                light: '#FFF'
                            }
                        }, err => {
                            if (err) isErr = true;
                            global.green('[POST Request] "/createQRCode"\tHOTKEY has beed saved');
                        });
                }).catch(err => {
                    global.red(err);
                    if (err) isErr = true;
                }).finally(_ => {
                    if (!isErr) {
                        return res.sendStatus(200);
                    } else {
                        return res.sendStatus(400);
                    }
                });

                rp({
                    method: 'POST',
                    uri: 'http://localhost:' + config.runPort + '/skillkeyPath',
                    body: {
                        courseName: req.body.courseName
                    },
                    json: true
                }).then(parsedBody => {
                    qrcode.toFile(dir + '/' + req.body.courseName.substring(0, req.body.courseName.indexOf('('))
                        + 'HOTKEY' + req.body.courseName.substring(req.body.courseName.indexOf('(')) + '.png', parsedBody, {
                            color: {
                                dark: '#000',
                                light: '#FFF'
                            }
                        }, err => {
                            if (err) isErr = true;
                            global.green('[POST Request] "/createQRCode"\tSKILLKEY has beed saved');
                        });
                }).catch(err => {
                    global.red(err);
                    if (err) isErr = true;
                }).finally(_ => {
                    if (!isErr) {
                        return res.sendStatus(200);
                    } else {
                        return res.sendStatus(400);
                    }
                });

                rp({
                    method: 'POST',
                    uri: 'http://localhost:' + config.runPort + '/hwkeyPath',
                    body: {
                        courseName: req.body.courseName
                    },
                    json: true
                }).then(parsedBody => {
                    qrcode.toFile(dir + '/' + req.body.courseName + '.png', parsedBody, {
                        color: {
                            dark: '#000',
                            light: '#FFF'
                        }
                    }, err => {
                        if (err) isErr = true;
                        global.green('[POST Request] "/createQRCode"\tHWKEY has beed saved');
                    });
                }).catch(err => {
                    global.red(err);
                    if (err) isErr = true;
                }).finally(_ => {
                    if (!isErr) {
                        return res.sendStatus(200);
                    } else {
                        return res.sendStatus(400);
                    }
                });

                rp({
                    method: 'POST',
                    uri: 'http://localhost:' + config.runPort + '/testkeyPath',
                    body: {
                        courseName: req.body.courseName
                    },
                    json: true
                }).then(parsedBody => {
                    qrcode.toFile(dir + '/' + req.body.courseName + '.png', parsedBody, {
                        color: {
                            dark: '#000',
                            light: '#FFF'
                        }
                    }, err => {
                        if (err) isErr = true;
                        global.green('[POST Request] "/createQRCode"\tTESTKEY has beed saved');
                    });
                }).catch(err => {
                    global.red(err);
                    if (err) isErr = true;
                }).finally(_ => {
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