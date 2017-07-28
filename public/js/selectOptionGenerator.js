function getOption() {
    getSubject();
    getSet();
    getSubset();
    getSetNo();
    getSubscript();
    getSubscriptNo();
    getMainRev();
    getSubRev();
    getTutor();
}

function getSubject() {
    var subjectOption = document.getElementById('subject');
    subjectOption.innerHTML = '<option value="none">Subject</option>';
    for (subject of config.availableSubjectList) {
        for (level of config.availableLevelList) {
            subjectOption.innerHTML += '<option value="' + subject + level + '">' + subject + level + '</option>';
        }
    }
}

function getSet() {
    var setOption = document.getElementById('set');
    setOption.innerHTML = '<option value="none">Set</option>';
    for (set of config.availableSetList) {
        setOption.innerHTML += '<option value="' + set + '">' + set + '</option>';
    }
}

function getSubset() {
    var subsetOption = document.getElementById('subset');
    subsetOption.innerHTML = '<option value="none">Subset</option>';
    for (subset of config.availableSubsetList) {
        subsetOption.innerHTML += '<option value="' + subset + '">' + subset + '</option>';
    }
}

function getSetNo() {
    var setNoOption = document.getElementById('setno');
    setNoOption.innerHTML = '<option value="none">SetNo</option>';
    for (let i = 0; i < config.maxSetNo; i++) {
        var temp = String(i + 1);
        if (temp.length === 1) temp = '0' + temp;
        setNoOption.innerHTML += '<option value="' + temp + '">' + temp + '</option>';
    }
}

function getSubscript() {
    var subscriptOption = document.getElementById('subscript');
    subscriptOption.innerHTML = '<option value="none">None</option>';
    for (subscript of config.availableSubscriptList) {
        subscriptOption.innerHTML += '<option value="' + subscript + '">' + subscript + '</option>';
    }
}

function getSubscriptNo() {
    var subscriptNoOption = document.getElementById('subscriptno');
    subscriptNoOption.innerHTML = '<option value="none">None</option>';
    for (let i = 0; i < config.maxSubscriptNo; i++) {
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

function getTutor(){
    var tutorOption = document.getElementById('tutor');
    tutorOption.innerHTML = '<option value="none">Select Tutor</option>';
    for (name of config.tutorName) {
        tutorOption.innerHTML += '<option value="' + name + '">' + name + '</option>';
    }
}