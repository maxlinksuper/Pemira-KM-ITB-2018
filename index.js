const electron = require ('electron');
const url = require ('url');
const path = require ('path');
const ipc = electron.ipcMain;
const {dialog} = require ('electron');
const axios = require ('axios');

var count = 0;
var MWAactive = 0;
var host = "localhost";
var port = "";

const { app , BrowserWindow, globalShortcut } = require ('electron');

let mainWindow;

app.on('ready', function() {
    // create new Window
    mainWindow = new BrowserWindow({
        background: "#D6D8DC"
    });
    // Load html into window
    mainWindow.loadFile('index.html');
    mainWindow.setKiosk(true);
    globalShortcut.register('Ctrl+Alt+R', function() {
        axios.post('http://localhost/test.php', {
                nim: "10010100",
                cmd: 2  
            }).then(function () {})
        dialog.showMessageBox({
            type: 'info',
            message: 'Database pemilih direset'
        });
    });
    globalShortcut.register('Ctrl+Alt+M', function() {
        if (MWAactive == 1) {
            MWAactive = 0;
            dialog.showMessageBox({
                type : 'info',
                message: 'Pemilihan MWA WM dinonaktifkan'
            });
        }
        else {
            MWAactive = 1;
            dialog.showMessageBox({
                type : 'info',
                message: 'Pemilihan MWA WM diaktifkan'
            });
        }
    });
    globalShortcut.register('Ctrl+Alt+C', function() {
        axios.get('http://localhost/calon.php', {
            params: {
                type: 0
            }
        }). then(function (response) {
            console.log(response);
            var c = response.data;
            console.log(c[1]);
        })
    })
    mainWindow.on('closed', function(){
        app.quit();
    });
    globalShortcut.register('Ctrl+Alt+D', function() {
        axios.post('http://localhost/test.php', {
            nim: "10010100",
            cmd: 3
        }).then(function () {})
    })
});

ipc.on('nim-pemilih', function(event, arg) {
    axios.post('http://localhost/test.php', {
        nim: arg,
        cmd: 1  
    }).then(function (response) {
        if (response.data.found == 0) {
            dialog.showErrorBox("Telah Memilih", "Anda sudah menggunakan kesempatan memilih anda");
        }
        else {
            if (arg.charAt(0) == '2') {
                if (MWAactive == 1) {
                    mainWindow.loadFile('congress-rule.html')
                }
                else { dialog.showErrorBox("Anda tidak bisa memilih", "Maaf, anda tidak bisa memilih"); }
            }
            else {
                mainWindow.loadFile('president-rule.html');
            }
        }
    })
});

ipc.on('readrule', function(event, arg) {
    if (arg == 1 || MWAactive == 0) {
        mainWindow.loadFile('president-vote.html');
    }
    else {
        mainWindow.loadFile('congress-vote.html');
    }
});

ipc.on('choose', function(event, arg1) {
    if (arg1 == 1) {
        mainWindow.loadFile('president-confirmation.html');
    }
    else {
        mainWindow.loadFile('congress-confirmation.html');
    }
});

ipc.on('cancel', function(event, arg) {
    console.log(count);
    if (count < 2) {
        count = count + 1;
        if (arg == 1) {
            mainWindow.loadFile('president-rule.html');
        }
        else {
            mainWindow.loadFile('congress-rule.html');
        }
    }
    else {
        dialog.showErrorBox("Batas memilih", "Maaf anda sudah mencapai batas memilih");
    }
});

ipc.on('confirm', function(event, arg) {
    if (arg == 1) {
        if (MWAactive == 1) {
            mainWindow.loadFile('congress-rule.html');
        }
        else {
            mainWindow.loadFile('thanks.html');
        }
    }
    else {
        mainWindow.loadFile('thanks.html');
    }
    count = 0;
});