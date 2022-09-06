const dbPlaylists = require("../dal/db-playlists");
const dbSongs = require("../dal/db-songs");

class PlaylistService {
  async getLists() {
    try {
      return await dbPlaylists.getPlaylists();
    } catch (e) {
      throw e;
    }
  }
  async addList(event, title) {
    try {
      await dbPlaylists.addPlaylist(title);
      const res = await dbPlaylists.getPlaylists();
      return res;
    } catch (e) {
      throw e;
    }
  }
  async rmList(event, playlist) {
    try {
      await dbSongs.removePlaylistSongs(playlist);
      await dbPlaylists.removePlaylist(playlist);
      const res = await dbPlaylists.getPlaylists();
      return res;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = new PlaylistService();
