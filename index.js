const electron = require ('electron');
const url = require ('url');
const path = require ('path');
const ipc = electron.ipcMain;


const { app , BrowserWindow } = require ('electron');

let mainWindow;

app.on('ready', function() {
    // create new Window
    mainWindow = new BrowserWindow({
        background: "#D6D8DC"
    });
    // Load html into window
    mainWindow.loadFile('index.html');
    mainWindow.setFullScreen(true);
    mainWindow.on('closed', () => {
    
    });
});

ipc.on('nim-pemilih', function(event,arg) {
    console.log("Database input success")
});