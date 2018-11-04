const electron = require('electron');
const ipc = electron.ipcRenderer;
const axios = require('axios');

var NIM = document.getElementById('nim');

if (NIM) {
    NIM.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode == 13) {
            // ipc.send('nim-pemilih');
            axios.post('http://localhost/test.php', {
                nim: document.getElementById('nim').value,
                cmd: 1  
            }).then(function (response) {
                ipc.send('nim-pemilih', response, document.getElementById('nim').value);
            })
        }
    });
}

