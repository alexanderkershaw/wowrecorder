const electron = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');

// ffmpeg 
const fluentFfmpeg = require('fluent-ffmpeg');
const staticFfmpeg = require('ffmpeg-static-electron');
//console.log(staticFfmpeg.path);
fluentFfmpeg.setFfmpegPath(staticFfmpeg.path);

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;

// Listen for app to be ready
app.on('ready', function () {
    // Create new window
    mainWindow = new BrowserWindow({});

    // Load html in window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Quit app when closed
    mainWindow.on('closed', function () {
        app.quit();
    });

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);

    // Open devtools
    mainWindow.webContents.openDevTools()
});

// Create menu template
const mainMenuTemplate = [
    // Each object is a dropdown
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
];

fluentFfmpeg('D:/checkouts/wow-recorder/mov.avi')
  .output('D:/checkouts/wow-recorder/mov2.mp4')
  .on('end', function() {
    console.log('Finished processing');
  })
  .run();