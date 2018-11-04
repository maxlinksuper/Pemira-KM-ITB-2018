const electron = require('electron');
const ipc = electron.ipcRenderer;

var rule = document.getElementById('OK');
var rule2 = document.getElementById('OK2');

if(rule) {
    rule.addEventListener("click", function(){
        ipc.send('readrule', 1);
    });
}

if(rule2) {
    rule2.addEventListener("click", function() {
        ipc.send('readrule', 2);
    });
}

var choose = document.getElementById('pilih');
var choose2 = document.getElementById('pilih2');

if(choose) {
    choose.addEventListener("click", function(){
        ipc.send('choose', 1);
    });
}

if (choose2) {
    choose2.addEventListener("click", function(){
        ipc.send('choose', 2);
    })
}

var cancel = document.getElementById('cancel');
var cancel2 = document.getElementById('cancel2');

if (cancel) {
    cancel.addEventListener("click", function() {
        ipc.send('cancel',1);
    });
}

if (cancel2) {
    cancel2.addEventListener("click", function() {
        ipc.send('cancel',2);
    });
}

var confirm = document.getElementById('accept');
var confirm2 = document.getElementById('accept2');

if(confirm) {
    confirm.addEventListener("click", function() {
        ipc.send('confirm',1);
    });
}
if (confirm2) {
    confirm2.addEventListener("click", function() {
        ipc.send('confirm', 2);
    });
}

var NIM = document.getElementById('nim');

if (NIM) {
    NIM.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode == 13) {
            ipc.send('nim-pemilih', document.getElementById('nim').value);
        }
    });
}