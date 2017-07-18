function getOption() {
    getSubject();
}

function getSubject() {
    $.get('http://localhost:4000/availableSubject',(data)=>{
        console.log(data);
    })
}