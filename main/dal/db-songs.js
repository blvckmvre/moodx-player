const db = require("./init");

class DBSongs {
  getSongs(playlist) {
    return new Promise((success, fail) => {
      db.all(
        `
        SELECT * FROM songs
        WHERE playlist='${playlist}';
      `,
        (e, rows) => {
          if (e) fail(e);
          success(rows);
        }
      );
    });
  }
  addSongs(songs) {
    return new Promise((success, fail) => {
      const queries = songs.map(
        (song) => `
          INSERT INTO songs(playlist,title,path,duration)
          VALUES('${song.playlist}','${song.title}','${song.path}','${song.duration}')
        `
      );
      db.exec(
        `
        BEGIN;
        ${queries.join("; ")};
        COMMIT;
      `,
        (e) => {
          if (e) fail(e);
          success();
        }
      );
    });
  }
  removeSong(id) {
    return new Promise((success, fail) => {
      db.run(
        `
        DELETE FROM songs
        WHERE id=${id};
      `,
        (e) => {
          if (e) fail(e);
          success();
        }
      );
    });
  }
  removePlaylistSongs(playlist) {
    return new Promise((success, fail) => {
      db.run(
        `
        DELETE FROM songs
        WHERE playlist='${playlist}';
      `,
        (e) => {
          if (e) fail(e);
          success();
        }
      );
    });
  }
}

module.exports = new DBSongs();
