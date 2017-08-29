var preview = document.getElementById('preview');

window.onload = function () {
    resizeUI();    
}

window.onresize = function () {
    resizeUI();
}

preview.onmousemove = function () {
//     log('movement');
    log(preview.contentWindow.test);
}

function resizeUI() {
    preview.style.width = window.innerWidth - 100 + 'px';
    preview.style.height = window.innerHeight - 100 + 'px';
}

function log(str) {
    console.clear();
    console.log(str);
}