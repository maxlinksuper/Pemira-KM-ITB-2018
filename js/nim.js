const electron = require('electron');
const path = require('path');
const url = require('url');
const ipc = electron.ipcRenderer;
const remote = electron.remote;
const axios = require('axios');

var NIM = document.getElementById('nim');

NIM.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        ipc.send('nim-pemilih', document.getElementById('nim').value);
        axios.post('http://localhost/test.php', {
            nim: document.getElementById('nim').value
        }).then(function (response) {
            console.log(response);
        })
        // var currWindow = remote.getCurrentWindow();
        // currWindow.$ = currWindow.jQuery = require('jquery');
        // currWindow.$.ajax({
        //     type: "POST",
        //     url: "localhost/test.php",
        //     data :{
        //         nim: document.getElementById('nim').value
        //     },
        //     success: function (response) {
        //         console.log(response);
        //     }
        // });
    }
});

