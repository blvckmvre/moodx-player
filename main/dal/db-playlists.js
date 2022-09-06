const db = require("./init");

class DBPlaylists {
  getPlaylists() {
    return new Promise((success, fail) => {
      db.all(`SELECT * FROM playlists`, (e, rows) => {
        if (e) fail(e);
        success(rows);
      });
    });
  }
  addPlaylist(title) {
    return new Promise((success, fail) => {
      db.run(
        `
        INSERT INTO playlists(title)
        VALUES('${title}');
      `,
        (e) => {
          if (e) fail(e);
          success();
        }
      );
    });
  }
  removePlaylist(playlist) {
    return new Promise((success, fail) => {
      db.run(
        `
        DELETE FROM playlists
        WHERE title='${playlist}';
      `,
        (e) => {
          if (e) fail(e);
          success();
        }
      );
    });
  }
}

module.exports = new DBPlaylists();
