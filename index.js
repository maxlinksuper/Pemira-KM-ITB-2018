const electron = require ('electron');
const url = require ('url');
const path = require ('path');
const ipc = electron.ipcMain;
const {dialog} = require ('electron');
const axios = require ('axios');

var count = 0;
var MWAactive = 0;
global.sharedObj = {pilihanKM: -1, pilihanMWA: -1, host: "localhost", nimPemilih: ""};

const { app , BrowserWindow, globalShortcut } = require ('electron');

let mainWindow;
let secondWindow;
let ipWindow;
let addCalonWindow;

app.on('ready', function() {
    // create new Window
    mainWindow = new BrowserWindow({
        background: "#D6D8DC"
    });
    // Load html into window
    mainWindow.loadFile('index.html');
    mainWindow.setKiosk(true);
    // mainWindow.setMenu(null);
    globalShortcut.register('Ctrl+Alt+R', function() {
        axios.post('http://' + global.sharedObj.host + '/test.php', {
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
    // globalShortcut.register('Ctrl+Alt+C', function() {
    //     axios.get('http://' + global.sharedObj.host + '/calon.php', {
    //         params: {
    //             type: 0
    //         }
    //     }). then(function (response) {
    //         // console.log(response);
    //         var c = response.data;
    //     });
    // });
    globalShortcut.register('Ctrl+Alt+D', function() {
        axios.post('http://' + global.sharedObj.host + '/test.php', {
            cmd:3
        }).then(function () {})
    });
    globalShortcut.register('Ctrl+Alt+P', function() {
        secondWindow = new BrowserWindow({
            width: 1000,
            height: 800
        })
        // secondWindow.setMenu(null);
        secondWindow.loadFile('sign-in.html');
    })
    mainWindow.on('closed', function(){
        app.quit();
    });
    globalShortcut.register('Ctrl+Alt+I', function() {
        ipWindow = new BrowserWindow({
            width: 800,
            height: 600
        })
        ipWindow.loadFile('set-ip.html')
    });
    globalShortcut.register('Ctrl+Alt+C', function() {
        addCalonWindow = new BrowserWindow({
            width: 1000,
            height: 800
        });
        addCalonWindow.loadFile('add-candidate.html');
    })

});

ipc.on('nim-pemilih', function(event, arg) {
    axios.post('http://' + global.sharedObj.host + '/test.php', {
        nim: arg,
        cmd: 1  
    }).then(function (response) {
        console.log(response);
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
            axios.post('http://' + global.sharedObj.host + '/test.php', {
                pilKM: global.sharedObj.pilihanKM+1,
                pilMWA: global.sharedObj.pilihanMWA+1,
                kode: global.sharedObj.nimPemilih.substring(0,3),
                cmd:4
            }).then(function(response) { 
                // console.log(response);
            });
            mainWindow.loadFile('thanks.html')
        }
    }
    else {
        axios.post('http://' + global.sharedObj.host + '/test.php', {
            pilKM: global.sharedObj.pilihanKM+1,
            pilMWA: global.sharedObj.pilihanMWA+1,
            kode: global.sharedObj.nimPemilih.substring(0,3),
            cmd: 4
        }).then(function(response) {
        });
        mainWindow.loadFile('thanks.html');
    }
    count = 0;
});

ipc.on('reset', function() {
    mainWindow.loadFile('index.html');
    global.sharedObj.pilihanKM = -1;
    global.sharedObj.pilihanMWA = -1;
    global.sharedObj.nimPemilih = -1;
});

ipc.on('error-handling', function(event,arg) {
    if (arg == 0) {
        dialog.showMessageBox({
            type: 'info',
            message: "Yang anda masukkan bukan NIM yang benar"
        })
    }
})

ipc.on('signin', function(event,arg) {
    axios.post('http://' + global.sharedObj.host + '/test.php', {
        pwd: arg,
        cmd: 3
    }).then(function(response) {
        console.log(response);
        if (response.data.found == 0) {
            dialog.showErrorBox("Password Salah", "Masukkan kembali password anda");
        }
        else {
            secondWindow.close();
        }
    });
})

ipc.on('set-ip', function(event,arg) {
    console.log("test");
    console.log(global.sharedObj.host);
    if (global.sharedObj.host == "localhost") {
        global.sharedObj.host = arg;
        ipWindow.close();
        dialog.showMessageBox({
            type: 'info',
            message: "IP berhasil diset"
        })
    }
    else {
        global.sharedObj.host = "localhost";
        ipWindow.close();
        dialog.showMessageBox({
            type: 'info',
            message: "Telah menjadi server"
        })
    }
    console.log(global.sharedObj.host);
})

ipc.on('addcandidate', function() {
    // addCalonWindow.close();
})