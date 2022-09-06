const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const ipcLogic = require("../main/ipc-logic");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 600,
    height: 800,
    resizable: false,
    fullscreenable: false,
    autoHideMenuBar: true,
    webPreferences: {
      devTools: false,
      preload: path.join(__dirname, "../main/preload.js"),
      webSecurity: false,
    },
  });
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
};

app.whenReady().then(() => {
  ipcLogic();
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
