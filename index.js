const electron = require ('electron');
const url = require ('url');
const path = require ('path');

const { app , BrowserWindow } = require ('electron');

let mainWindow;

app.on('ready', function() {
    // create new Window
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        background: "#D6D8DC"
    });
    // Load html into window
    mainWindow.loadFile('index.html');
    mainWindow.setFullScreen(true);
    mainWindow.on('closed', () => {

    });
});
