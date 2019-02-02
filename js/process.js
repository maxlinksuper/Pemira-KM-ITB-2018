const electron = require('electron');
const ipc = electron.ipcRenderer;
const remote = electron.remote;
const {dialog} = require('electron');

var NIM = document.getElementById('nim');

if (NIM) {
    NIM.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode == 13) {
            if (NIM.value.length == 8) {
                remote.getGlobal('sharedObj').nimPemilih = NIM.value;
                ipc.send('nim-pemilih', NIM.value);
            }
            else {
                ipc.send('error-handling', 0);
            }
        }
    });
}

var rule = document.getElementById('YA');
var rule2 = document.getElementById('YA2');

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
var confirm2 = document.getElementById('YAC');

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

function select1(index_candidate) {
    var prev = document.getElementById("selected").innerHTML;
    var choose = document.getElementById('pilih');
    var x = document.getElementsByClassName("candidate");
    var y = document.getElementsByClassName("kawung-img");
    var z = document.getElementsByClassName("candidate-img");
    if (prev != index_candidate) {
        x[index_candidate].classList.add("candidate-active");
        y[index_candidate].classList.add("kawung-img-active");
        z[index_candidate].classList.remove("filter");
        document.getElementById("selected").innerHTML = index_candidate;
    }
    else {
        document.getElementById("selected").innerHTML = -1;
    }
    if (prev != -1) {
        x[prev].classList.remove("candidate-active");
        y[prev].classList.remove("kawung-img-active");
        z[prev].classList.add("filter");
    }
    if(choose) {
        choose.addEventListener("click", function(){
            remote.getGlobal('sharedObj').pilihanKM = document.getElementById("selected").innerHTML;
            console.log(remote.getGlobal('sharedObj').pilihanKM);
            ipc.send('choose', 1);
        });
    }
}

function select2(index_candidate) {
    var prev = document.getElementById("selected2").innerHTML;
    var choose2 = document.getElementById('pilih2');
    var x = document.getElementsByClassName("candidate");
    var y = document.getElementsByClassName("kawung-img");
    var z = document.getElementsByClassName("candidate-img");
    if (prev != index_candidate) {
        x[index_candidate].classList.add("candidate-active");
        y[index_candidate].classList.add("kawung-img-active");
        z[index_candidate].classList.remove("filter");
        document.getElementById("selected2").innerHTML = index_candidate;
    }
    else {
        document.getElementById("selected2").innerHTML = -1;
    }
    if (prev != -1) {
        x[prev].classList.remove("candidate-active");
        y[prev].classList.remove("kawung-img-active");
        z[prev].classList.add("filter");
    }
    if (choose2) {
        choose2.addEventListener("click", function(){
            remote.getGlobal('sharedObj').pilihanMWA = document.getElementById("selected2").innerHTML;
            ipc.send('choose', 2);
        })
    }
}

var thank = document.getElementById("thanks");
if (thank) {
    document.addEventListener("keyup", function(event) {
        event.preventDefault();
        if(event.keyCode == 13 && event.keyCode == 84) {
            ipc.send('reset');
        }
    })
}

var signin = document.getElementById("signin");
if (signin) {
    signin.addEventListener("click", function(event) {
        var tpsP = document.getElementById("uPwd").value;
        ipc.send('signin', tpsP);
    })
}

var setip = document.getElementById("setip");
if (setip) {
    setip.addEventListener("click", function(event) {
        var ipAddr = document.getElementById("ipaddr");
        ipc.send('set-ip', ipAddr);
    })
}


