const { dialog } = require("electron");
const path = require("path");
const fs = require("fs").promises;
const dbSongs = require("../dal/db-songs");
const getDuration = require("get-mp3-duration");

class SongService {
  async getSongs(event, playlist) {
    try {
      return await dbSongs.getSongs(playlist);
    } catch (e) {
      throw e;
    }
  }
  async addSongs(event, playlist) {
    try {
      const fileObj = await dialog.showOpenDialog({
        title: "Upload songs",
        properties: ["multiSelections", "openFile"],
        filters: [
          {
            name: "Audio",
            extensions: ["mp3", "wav"],
          },
        ],
      });
      if (fileObj.canceled) return false;
      const files = fileObj.filePaths.map((filePath) => ({
        playlist,
        title: path.basename(filePath),
        path: filePath,
      }));
      await (async () => {
        for (let i = 0; i < files.length; i++) {
          const buffer = await fs.readFile(files[i].path);
          files[i].duration = await new Promise((success) =>
            success(getDuration(buffer) / 1000)
          );
        }
      })();
      await dbSongs.addSongs(files);
      return await dbSongs.getSongs(playlist);
    } catch (e) {
      throw e;
    }
  }
  async rmSong(event, id) {
    try {
      await dbSongs.removeSong(id);
    } catch (e) {
      throw e;
    }
  }
}

module.exports = new SongService();
