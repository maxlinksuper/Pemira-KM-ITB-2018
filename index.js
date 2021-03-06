    const electron = require ('electron');
const url = require ('url');
const path = require ('path');
const ipc = electron.ipcMain;
const {dialog} = require ('electron');
const axios = require ('axios');

var count = 0;
var KMactive = 1;
var MWAactive = 0;
global.sharedObj = {pilihanKM: -1, pilihanMWA: -1, host: "localhost", nimPemilih: "", imgPilKM:"", namaPilKM: "", namaPilMWA:""};

const { app , BrowserWindow, globalShortcut } = require ('electron');

let mainWindow;
let secondWindow;
let ipWindow;
let addCalonWindow;
let chanceWindow;

app.on('ready', function() {
    // create new Window
    mainWindow = new BrowserWindow({
        background: "#D6D8DC"
    });
    // Load html into window
    mainWindow.loadFile('index.html');
    mainWindow.setKiosk(true);
    // mainWindow.setMenu(null);

    // Shortcut to reset database
    globalShortcut.register('Ctrl+Alt+R', function() {
        secondWindow = new BrowserWindow({
            width: 1000,
            height: 800
        })
        // secondWindow.setMenu(null);
        secondWindow.loadFile('sign-in.html');
        ipc.on('signin', function(event,arg) {
            axios.post('http://' + global.sharedObj.host + '/test.php', {
                pwd: arg,
                cmd: 3
            }).then(function(response) {
                // console.log(response);
                if (response.data.found == 0) {
                    dialog.showErrorBox("Password Salah", "Masukkan kembali password anda");
                }
                else {
                    axios.post('http://' + global.sharedObj.host + '/test.php', {
                        nim: "10010100",
                        cmd: 2  
                    }).then(function () {
                        dialog.showMessageBox({
                            type: 'info',
                            message: 'Database pemilih direset'
                        });
                    });
                    secondWindow.close();
                }
            });
        });
    });

    // Shortcut to activate / deactivate congress voting
    globalShortcut.register('Ctrl+Alt+N', function() {
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

    // Shortcut to activate / deactivate congress voting
    globalShortcut.register('Ctrl+Alt+3', function() {
        if (KMactive == 1) {
            KMactive = 0;
            MWAactive = 1;
            dialog.showMessageBox({
                type : 'info',
                message: 'Pemilihan KM dinonaktifkan & Pemilihan MWA WM diaktifkan'
            });
        }
        else {
            KMactive = 1;
            MWAactive = 0;
            dialog.showMessageBox({
                type : 'info',
                message: 'Pemilihan KM diaktifkan & Pemilihan MWA WM dinonaktifkan'
            });
        }
    });

    // Shortcut to show sign in window
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

    // Shortcut to show ip setting window
    globalShortcut.register('Ctrl+Alt+I', function() {
        ipWindow = new BrowserWindow({
            width: 800,
            height: 600
        })
        ipWindow.loadFile('set-ip.html')
    });

    // Shortcut to add new candidate
    globalShortcut.register('Ctrl+Alt+C', function() {
        addCalonWindow = new BrowserWindow({
            width: 1000,
            height: 800
        });
        addCalonWindow.loadFile('add-candidate.html');
    });

    // Shortcut to print data
    globalShortcut.register('Ctrl+Alt+K', function() {
        ipWindow = new BrowserWindow({
            width: 1000,
            height: 800
        });
        ipWindow.loadFile('open-data.html')
    });

    globalShortcut.register('Ctrl+Alt+1', function() {
        mainWindow.minimize();
    });

    globalShortcut.register('Ctrl+Alt+2', function() {
        chanceWindow = new BrowserWindow({
            width: 1000,
            height: 800
        })
        chanceWindow.loadFile('nim-reset.html')
    });

    globalShortcut.register('Ctrl+Alt+4', function() {
        chanceWindow = new BrowserWindow({
            width: 1000,
            height: 800
        })
        chanceWindow.loadFile('insert-password.html')
    });
});

ipc.on('nim-pemilih', function(event, arg) {
    axios.post('http://' + global.sharedObj.host + '/test.php', {
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
                if (KMactive == 1) {
                    mainWindow.loadFile('president-rule.html');
                }
                else {
                    mainWindow.loadFile('congress-rule.html');
                }
            }
        }
    });
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
        if (global.sharedObj.pilihanKM == 8) {
            mainWindow.loadFile('president-confirmation-abstain.html');
        }
        else {
            mainWindow.loadFile('president-confirmation.html');
        }
    }
    else {
        if (global.sharedObj.pilihanMWA == 8) {
            mainWindow.loadFile('congress-confirmation-abstain.html');
        }
        else {
            console.log(global.sharedObj.pilihanMWA);
            if (global.sharedObj.pilihanMWA == 0) {
                mainWindow.loadFile('congress-confirmation1.html');
            }
            else {
                mainWindow.loadFile('congress-confirmation2.html')
            }
        }
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
            console.log(global.sharedObj.pilihanKM);
            axios.post('http://' + global.sharedObj.host + '/test.php', {
                pilKM: parseInt(global.sharedObj.pilihanKM)+1,
                pilMWA: parseInt(global.sharedObj.pilihanMWA)+1,
                kode: global.sharedObj.nimPemilih.substring(0,3),
                cmd:4
            }).then(function(response) { 
            });
            mainWindow.loadFile('thanks.html')
        }
    }
    else {
        axios.post('http://' + global.sharedObj.host + '/test.php', {
            pilKM: parseInt(global.sharedObj.pilihanKM)+1,
            pilMWA: parseInt(global.sharedObj.pilihanMWA)+1,
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
        if (response.data.found == 0) {
            dialog.showErrorBox("Password Salah", "Masukkan kembali password anda");
        }
        else {
            dialog.showMessageBox({
                type : 'info',
                message: 'Signin berhasil'
            });
            secondWindow.close();
        }
    });
})

ipc.on('resetnim', function(event,arg) {
    axios.post('http://' + global.sharedObj.host + '/test.php', {
        nim: arg,
        cmd: 6
    }).then(function() {
        dialog.showMessageBox({
            type : 'info',
            message: 'NIM bisa melakukan pemilihan sekali lagi'
        });
        chanceWindow.close();
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

ipc.on('addCandidate', function(event, arg1, arg2, arg3, arg4) {
    console.log("masuk");
    axios.post('http://' + global.sharedObj.host + '/test.php', {
        nama : arg1,
        nim : arg2,
        dari : arg3,
        img : arg4,
        cmd : 5
    }).then(function(response) {
        console.log(response);
    });
    addCalonWindow.close();
})

ipc.on('printkotaksuara', function(event, arg1, arg2, arg3, arg4, arg5, arg6){
    console.log("Password Inserted");
    console.log(arg1);
    console.log(arg2);
    console.log(arg3);
    console.log(arg4);
    console.log(arg5);
    console.log(arg6);
    axios.post('http://' + global.sharedObj.host + '/cetak.php', {
        pwd1 : arg1,
        pwd2 : arg2,
        pwd3 : arg3,
        pwd4 : arg4,
        pwd5 : arg5,
        pwd6 : arg6
    }).then(function(response) {
        console.log(response);
    });
});

ipc.on('addPassword', function(event, arg) {
    console.log("Password Added");
    axios.post('http://' + global.sharedObj.host + '/test.php', {
        uPwd : arg,
        cmd : 7
    }).then(function(response) {
        console.log(response);
    });
});