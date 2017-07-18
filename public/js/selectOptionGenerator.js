function getOption() {
    getSubject();
    getLevel();
    getSet();
    getSubset();
}

function getSubject() {
    var subjectOption = document.getElementById('subject');
    subjectOption.innerHTML = '<option value="none">Subject</option>';
    config.availableSubjectList.forEach(function (element) {
        subjectOption.innerHTML += '<option value="' + element + '">' + element + '</option>';
    }, this);
}

function getLevel(){
    var levelOption = document.getElementById('level');
    levelOption.innerHTML = '<option value="none">Level</option>';
    config.availableLevelList.forEach(function (element) {
        levelOption.innerHTML += '<option value="' + element + '">' + element + '</option>';
    }, this);
}

function getSet(){
    var setOption = document.getElementById('set');
    setOption.innerHTML = '<option value="none">Set</option>';
    config.availableSetList.forEach(function (element) {
        setOption.innerHTML += '<option value="' + element + '">' + element + '</option>';
    }, this);
}

function getSubset(){
    var subsetOption = document.getElementById('subset');
    subsetOption.innerHTML = '<option value="none">Subset</option>';
    config.availableSubsetList.forEach(function (element) {
        subsetOption.innerHTML += '<option value="' + element + '">' + element + '</option>';
    }, this);
}