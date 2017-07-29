var bodyParser = require('body-parser');
var chalk = require('chalk');
var global = require('./global');
var config = require('./config');

var jsonParser = bodyParser.json();

var urlencodedParser = bodyParser.urlencoded({ extended: true });

module.exports = function (app) {
    app.use(bodyParser.json());

    /**
     * courseName format: subject + level + '-' + set + subset + setNo + {subscript + subscriptNo} + '(REV' + mainRev + '_' + subRev
     * e.g. MK-AB11r1(REV1_0)
     * @param {String} courseName 
     */

    function decodeCourseName(courseName) {
        var courseNameComponent = {};
        courseNameComponent.fatalError = null;

        var errorLog = (err) => {
            global.error(courseNameComponent.fatalError = err);
            return courseNameComponent;
        }

        //locate index of "("
        var indexOfBracket;
        try {
            indexOfBracket = courseName.indexOf('(');
            if (indexOfBracket === -1) throw new Error(chalk.red('Cannot locate "(" in courseName'));
        } catch (error) {
            errorLog(error);
        }

        //locate index of "-"
        var indexOfHyphen;
        try {
            indexOfHyphen = courseName.indexOf('-');
            if (indexOfHyphen === -1) throw new Error(chalk.red('Cannot locate "-" in courseName'));
        } catch (error) {
            errorLog(error);
        }

        //locate index of "_"
        var indexOfUnderscore;
        try {
            indexOfUnderscore = courseName.indexOf('_');
            if (indexOfUnderscore === -1) throw new Error(chalk.red('Cannot locate "_" in courseName'));
        } catch (error) {
            errorLog(error);
        }

        //locate index of first integer
        var indexOfFirstInt = -1;
        try {
            for (let i = 0; i < courseName.length; i++) {
                if (Number.isInteger(parseInt(courseName.charAt(i)))) {
                    indexOfFirstInt = i;
                    break;
                }
            }
            if (indexOfFirstInt === -1) throw new Error(chalk.red('Cannot locate number in courseName'));
        } catch (error) {
            errorLog(error);
        }

        //Get subject from courseName
        try {
            courseNameComponent.subject = courseName.charAt(0);
            if (config.subjectFullName[courseNameComponent.subject] === undefined) throw new Error(chalk.red('Cannot get level form courseName, index out of range'));
        } catch (error) {
            errorLog(error);
        }

        //Get level from courseName
        try {
            courseNameComponent.level = courseName.charAt(1);
            if (courseNameComponent.level === undefined) throw new Error(chalk.red('Cannot get level form courseName, index out of range'));
            if (config.availableLevelList.indexOf(courseNameComponent.level) === -1) throw new Error(chalk.red('Invalid level, cannot find value in config'));
        } catch (error) {
            errorLog(error);
        }

        //Get set from courseName
        try {
            courseNameComponent.set = courseName.substring(indexOfHyphen + 1, indexOfFirstInt - 1);
            if (courseNameComponent.set === undefined) throw new Error(chalk.red('Cannot get set form courseName, index out of range'));
            if (config.availableSetList.indexOf(courseNameComponent.set) === -1) throw new Error(chalk.red('Invalid set, cannot find value in config'));
        } catch (error) {
            errorLog(error);
        }

        //Get subset from courseName
        try {
            courseNameComponent.subset = courseName.charAt(indexOfFirstInt - 1);
            if (courseNameComponent.subset === undefined) throw new Error(chalk.red('Cannot get subset from courseName, index out of range'));
            if (config.availableSubsetList.indexOf(courseNameComponent.subset) === -1) throw new Error(chalk.red('Invalid set, cannot find value in config'));
        } catch (error) {
            errorLog(error);
        }

        //Get setNo from courseName
        try {
            courseNameComponent.setNo = parseInt(courseName.substring(indexOfFirstInt, indexOfFirstInt + 2));
            if (courseName.substring(indexOfFirstInt, indexOfFirstInt + 1) === undefined) throw new Error(chalk.red('Cannot get setNo form courseName, index out of range'));
            if (courseNameComponent.setNo === undefined) throw new Error(chalk.red('Invalid setNo, cannot parse setNo into int'));
            courseNameComponent.setNo = String(courseNameComponent.setNo);
            if (courseNameComponent.setNo.length === 1) {
                courseNameComponent.setNo = "0" + courseNameComponent.setNo;
            }
        } catch (error) {
            errorLog(error);
        }

        //Get subscript from courseName
        try {
            courseNameComponent.subscript = courseName.charAt(indexOfFirstInt + 2);
            if (courseNameComponent.subscript === undefined) throw new Error(chalk.red('Cannot get subscript from courseName, index out of range'));
            if (config.availableSubscriptList.indexOf(courseNameComponent.subscript) === -1) throw new Error(chalk.red('Invalid subscript, cannot find value in config'));
        } catch (error) {
            global.error(error);
            courseNameComponent.subscript = '';
        }

        //Get subscriptNo from courseName
        try {
            courseNameComponent.subscriptNo = parseInt(courseName.substring(indexOfFirstInt + 3, indexOfFirstInt + 5));
            if (courseName.substring(indexOfFirstInt + 3, indexOfFirstInt + 5) === undefined) throw new Error(chalk.red('Cannot subscriptNo from courseName, index out od range'));
            if (isNaN(courseNameComponent.subscriptNo)) throw new Error(chalk.red('Invalid subscriptNo, cannot parse subscriptNo into int'));
            courseNameComponent.subscriptNo = String(courseNameComponent.subscriptNo);
            if (courseNameComponent.subscriptNo.length === 1) {
                courseNameComponent.subscriptNo = "0" + courseNameComponent.subscriptNo;
            }
        } catch (error) {
            global.error(error);
            courseNameComponent.subscriptNo = '';
        }

        //Get mainRev from courseName
        try {
            courseNameComponent.mainRev = parseInt(courseName.charAt(indexOfBracket + 4));
            if (courseName.charAt(indexOfBracket + 4) === undefined) throw new Error(chalk.red('Cannot get mainRev form courseName, index out of range'));
            if (courseNameComponent.mainRev === undefined) throw new Error(chalk.red('Invalid mainRev, cannot parse mainRev into int'));
        } catch (error) {
            errorLog(error);
        }

        //Get subRev form courseName
        try {
            courseNameComponent.subRev = parseInt(courseName.charAt(indexOfUnderscore + 1));
            if (courseName.charAt(indexOfUnderscore + 1) === undefined) throw new Error(chalk.red('Cannot get subRev from courseName, index out of range'));
            if (courseNameComponent.subRev === undefined) throw new Error(chalk.red('Invalid subRev, cannot parse subRev into int'));
        } catch (error) {
            errorLog(error);
        }

        return courseNameComponent;
    }

    // app.post('/keyQRCodePath', function (req, res) {
    //     global.cyan('[POST Request] "/keyQRCodePath"\tbody => ');
    //     global.log(req.body);

    //     if (req.body.courseName === null) return res.status(400).send('Bad Request');

    //     var courseName = decodeCourseName(req.body.courseName);

    //     if (courseName.fatalError !== null) return res.status(400).send('Bad Course name');

    //     res.status(200).send('file://monkeycloud/' + config.subjectFullName[courseName.subject]
    //         + '/' + courseName.subject + courseName.level + '-' + courseName.set
    //         + '/' + courseName.subject + courseName.level + '-' + courseName.set + '(REV' + courseName.mainRev + ')'
    //         + '/' + courseName.subject + courseName.level + '-' + courseName.set + courseName.subset + courseName.setNo
    //         + '/' + courseName.subject + courseName.level + '-' + courseName.set + courseName.subset + courseName.setNo
    //         + courseName.subscript + courseName.subscriptNo + '(REV' + courseName.mainRev + '_' + courseName.subRev + ').pdf');
    // });

    app.post('/hotkeyPath', function (req, res) {
        global.cyan('[POST Request] "/hotKeyPath"\tbody => ');
        global.log(req.body);

        if (req.body.courseName === null) return res.status(400).send('Bad Request');

        var courseName = decodeCourseName(req.body.courseName);

        if (courseName.fatalError !== null) return res.status(400).send('Bad Course name');

        res.status(200).send('file://monkeycloud/' + config.subjectFullName[courseName.subject]
            + '/' + courseName.subject + courseName.level + '-' + courseName.set
            + '/' + courseName.subject + courseName.level + '-' + courseName.set + '(REV' + courseName.mainRev + ')'
            + '/' + courseName.subject + courseName.level + '-' + courseName.set + courseName.subset + courseName.setNo
            + '/' + courseName.subject + courseName.level + '-' + courseName.set + courseName.subset + courseName.setNo
            + courseName.subscript + courseName.subscriptNo + 'HOTKEY' + '(REV' + courseName.mainRev + '_' + courseName.subRev + ').pdf');
    });

    app.post('/skillkeyPath', function (req, res) {
        global.cyan('[POST Request] "/skillKeyPath"\tbody => ');
        global.log(req.body);

        if (req.body.courseName === null) return res.status(400).send('Bad Request');

        var courseName = decodeCourseName(req.body.courseName);

        if (courseName.fatalError !== null) return res.status(400).send('Bad Course name');

        res.status(200).send('file://monkeycloud/' + config.subjectFullName[courseName.subject]
            + '/' + courseName.subject + courseName.level + '-' + courseName.set
            + '/' + courseName.subject + courseName.level + '-' + courseName.set + '(REV' + courseName.mainRev + ')'
            + '/' + courseName.subject + courseName.level + '-' + courseName.set + courseName.subset + courseName.setNo
            + '/' + courseName.subject + courseName.level + '-' + courseName.set + courseName.subset + courseName.setNo
            + courseName.subscript + courseName.subscriptNo + 'SKILLKEY' + '(REV' + courseName.mainRev + '_' + courseName.subRev + ').pdf');
    });

    app.post('/hwkeyPath', function (req, res) {
        global.cyan('[POST Request] "/hwKeyPath"\tbody => ');
        global.log(req.body);

        if (req.body.courseName === null) return res.status(400).send('Bad Request');

        var courseName = decodeCourseName(req.body.courseName);

        if (courseName.fatalError !== null) return res.status(400).send('Bad Course name');

        res.status(200).send('file://monkeycloud/' + config.subjectFullName[courseName.subject]
            + '/' + courseName.subject + courseName.level + '-' + courseName.set
            + '/' + courseName.subject + courseName.level + '-' + courseName.set + '(REV' + courseName.mainRev + ')'
            + '/' + courseName.subject + courseName.level + '-' + courseName.set + courseName.subset + courseName.setNo
            + '/' + courseName.subject + courseName.level + '-' + courseName.set + courseName.subset + courseName.setNo
            + courseName.subscript + courseName.subscriptNo + 'HWKEY' + '(REV' + courseName.mainRev + '_' + courseName.subRev + ').pdf');
    });

    app.post('/testkeyPath', function (req, res) {
        global.cyan('[POST Request] "/testKeyPath"\tbody => ');
        global.log(req.body);

        if (req.body.courseName === null) return res.status(400).send('Bad Request');

        var courseName = decodeCourseName(req.body.courseName);

        if (courseName.fatalError !== null) return res.status(400).send('Bad Course name');

        res.status(200).send('file://monkeycloud/' + config.subjectFullName[courseName.subject]
            + '/' + courseName.subject + courseName.level + '-' + courseName.set
            + '/' + courseName.subject + courseName.level + '-' + courseName.set + '(REV' + courseName.mainRev + ')'
            + '/' + courseName.subject + courseName.level + '-' + courseName.set + courseName.subset + courseName.setNo
            + '/' + courseName.subject + courseName.level + '-' + courseName.set + courseName.subset + courseName.setNo
            + courseName.subscript + courseName.subscriptNo + 'TESTKEY' + '(REV' + courseName.mainRev + '_' + courseName.subRev + ').pdf');
    });

    app.post('/keyStudentPath', function (req, res) {
        global.cyan('[POST Request] "/keyStudentPath"\tbody => ');
        global.log(req.body);

        if (req.body.courseName === null) return res.status(400).send('Bad Request');

        var courseName = decodeCourseName(req.body.courseName);

        if (courseName.fatalError !== null) return res.status(400).send('Bad Course name');

        res.status(200).send('file://monkeycloud/' + config.subjectFullName[courseName.subject]
            + '/' + courseName.subject + courseName.level + '-' + courseName.set
            + '/' + courseName.subject + courseName.level + '-' + courseName.set + courseName.subset + courseName.setNo
            + '/' + courseName.subject + courseName.level + '-' + courseName.set + courseName.subset + courseName.setNo
            + courseName.subscript + courseName.subscriptNo + '(REV' + courseName.mainRev + '_' + courseName.subRev + ').pdf');
    });
}
