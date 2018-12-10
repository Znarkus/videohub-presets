'use strict'

const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron')
const { IN, OUT, scenes, saveTo } = require('./data')

const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open...',
        accelerator: 'CommandOrControl+O',
        id: 'open',
        click () {
          console.log(dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [
              {
                name: 'Videohub Preset JSON file',
                extensions: ['json']
              },
            ]
          }))
        }
      },
      {
        label: 'Save as...',
        accelerator: 'CommandOrControl+Shift+S',
        id: 'saveas',
        click () {
          const savePath = dialog.showSaveDialog({
            filters: [
              {
                name: 'Videohub Preset JSON file',
                extensions: ['json']
              },
            ]
          })

          if (savePath) saveTo(savePath)
        }
      },
    ]
  },
]

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      { role: 'quit' }
    ]
  })
}

const menu = Menu.buildFromTemplate(template)

ipcMain.on('trigger-scene', (event, arg) => {
  const scene = scenes[arg.scene]
  console.log(scene)
  // event.sender.send('asynchronous-reply', 'pong')
})

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  Menu.setApplicationMenu(menu)

  // Create the browser window.
  // win = new BrowserWindow({ width: 1200, height: 900 })
  win = new BrowserWindow({ width: 600, height: 700 })

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
