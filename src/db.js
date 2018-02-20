const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./bookmarks.sqlite', (err) => {
  if (err) {
    return console.error(err.message);
  }

  console.log('Connected to sqlite');
});


module.exports = db;
