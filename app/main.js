/**
 * Created by victoroliveira on 07/04/16.
 */

var app = require('app');
var Menu = require('menu');

var defaultMenuTemplate = require('./assets/js/menu');

// Module to create native browser window.
var BrowserWindow = require('browser-window');
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function () {

    app.setName('Template Builder');

    // Create the browser window.
    mainWindow = new BrowserWindow({ width: 800, height: 600 });

    // and load the index.html of the app.
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    // Open the devtools.
    // mainWindow.openDevTools();
    // Emitted when the window is closed.
    mainWindow.on('closed', function () {

        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

    Menu.setApplicationMenu(Menu.buildFromTemplate(defaultMenuTemplate));

});