const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  getPlaylists: () => ipcRenderer.invoke("playlists:get"),
  addPlaylist: (title) => ipcRenderer.invoke("playlists:add", title),
  rmPlaylist: (playlist) => ipcRenderer.invoke("playlists:rm", playlist),

  getSongs: (playlist) => ipcRenderer.invoke("songs:get", playlist),
  addSongs: (playlist) => ipcRenderer.invoke("songs:add", playlist),
  rmSong: (id) => ipcRenderer.invoke("songs:rm", id),
});
