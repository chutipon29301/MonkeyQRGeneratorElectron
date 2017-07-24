function getOption() {
    getSubject();
    getLevel();
    getSet();
    getSubset();
    getSetNo();
    getSubscript();
    getSubscriptNo();
    getMainRev();
    getSubRev();
}

function getSubject() {
    var subjectOption = document.getElementById('subject');
    subjectOption.innerHTML = '<option value="none">Subject</option>';
    config.availableSubjectList.forEach(function (element) {
        subjectOption.innerHTML += '<option value="' + element + '">' + element + '</option>';
    }, this);
}

function getLevel() {
    var levelOption = document.getElementById('level');
    levelOption.innerHTML = '<option value="none">Level</option>';
    config.availableLevelList.forEach(function (element) {
        levelOption.innerHTML += '<option value="' + element + '">' + element + '</option>';
    }, this);
}

function getSet() {
    var setOption = document.getElementById('set');
    setOption.innerHTML = '<option value="none">Set</option>';
    config.availableSetList.forEach(function (element) {
        setOption.innerHTML += '<option value="' + element + '">' + element + '</option>';
    }, this);
}

function getSubset() {
    var subsetOption = document.getElementById('subset');
    subsetOption.innerHTML = '<option value="none">Subset</option>';
    config.availableSubsetList.forEach(function (element) {
        subsetOption.innerHTML += '<option value="' + element + '">' + element + '</option>';
    }, this);
}

function getSetNo() {
    var setNoOption = document.getElementById('setno');
    setNoOption.innerHTML = '<option value="none">SetNo</option>';
    for (let i = 0; i < 99; i++) {
        var temp = String(i + 1);
        if (temp.length === 1) temp = '0' + temp;
        setNoOption.innerHTML += '<option value="' + temp + '">' + temp + '</option>';
    }
}

function getSubscript() {
    var subscriptOption = document.getElementById('subscript');
    subscriptOption.innerHTML = '<option value="none">None</option>';
    config.availableSubscriptList.forEach(function (element) {
        subscriptOption.innerHTML += '<option value="' + element + '">' + element + '</option>';
    }, this);
}

function getSubscriptNo() {
    var subscriptNoOption = document.getElementById('subscriptno');
    subscriptNoOption.innerHTML = '<option value="none">None</option>';
    for (let i = 0; i < 99; i++) {
        var temp = String(i + 1);
        if (temp.length === 1) temp = '0' + temp;
        subscriptNoOption.innerHTML += '<option value="' + temp + '">' + temp + '</option>';
    }
}

function getMainRev() {
    var mainRevOption = document.getElementById('mainrev');
    for (let i = 0; i < 9; i++) {
        mainRevOption.innerHTML += '<option value="' + (i + 1) + '">' + (i + 1) + '</option>';
    }
}

function getSubRev() {
    var subRevOption = document.getElementById('subrev');
    for (let i = 0; i < 10; i++) {
        subRevOption.innerHTML += '<option value="' + i + '">' + i + '</option>';
    }
}

var sheetCode = [];

for (var subject of config.availableSubjectList) {
    for (var level of config.availableLevelList) {
        for (var set of config.availableSetList) {
            for (var subset of config.availableSubsetList) {
                for (let i = 0; i < config.maxSetNo; i++) {
                    var setno = String(i + 1);
                    if (setno.length === 1) setno = '0' + setno;
                    for (var subscript of config.availableSubscriptList) {
                        var sheetset = subject + level + '-' + set + subset + setno + subscript;
                        sheetCode.push(sheetset);
                    }
                }
            }
        }
    }
}
function getSubjectCode() {

    var numbers = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: sheetCode
    });

    // initialize the bloodhound suggestion engine
    numbers.initialize();

    $("#textbox").typeahead({
        items: 8,
        source: numbers.ttAdapter()
    });

    // $('#textbox').typeahead({
    //     source: sheetCode
    // });
}