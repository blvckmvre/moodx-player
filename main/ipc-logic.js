const { ipcMain } = require("electron");
const playlistService = require("./services/playlist-service");
const songService = require("./services/song-service");

module.exports = function () {
  ipcMain.handle("playlists:get", playlistService.getLists);
  ipcMain.handle("playlists:add", playlistService.addList);
  ipcMain.handle("playlists:rm", playlistService.rmList);

  ipcMain.handle("songs:get", songService.getSongs);
  ipcMain.handle("songs:add", songService.addSongs);
  ipcMain.handle("songs:rm", songService.rmSong);
};
