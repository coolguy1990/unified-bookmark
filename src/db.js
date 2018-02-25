const sqlite3 = require('sqlite3').verbose();

class Db {
  constructor (filePath = './bookmarks.sqlite') {
    this.db = new sqlite3.Database(filePath, (err) => {
      if (err) throw new Error(err);

      console.log('Connected to sqlite');
    });

    this.createDatabase();
  }

  async createDatabase () {
    this.db.run('CREATE TABLE if not exists bookmarks (id INT, title TEXT, url TEXT, favicon TEXT, folder TEXT)', function (err) {
      if (err) throw new Error(err);
    });
  }
}


module.exports = Db;
