const chrome = require('./browsers/chrome');
const sqlite3 = require('sqlite3').verbose();
const groupBy= require('lodash/groupBy');
// Connect to Database
// const db = new sqlite3.Database('./bookmarks.sqlite', (err) => {
//   if (err) {
//     return console.error(err.message);
//   }

//   console.log('Connected to sqlite');
// });

// Create Database if not exists
// db.serialize(function () {
//   db.run('CREATE TABLE if not exists bookmarks (id INT, title TEXT, url TEXT, favicon TEXT, folder TEXT)');
// });

const getChrome = chrome.getBookmarks(chrome.getDirectory(process.platform));

const bookmarks = getChrome.then(bookmarks => {
  // const bookmarksByFolder = groupBy(bookmarks, 'folder');

  // Object.keys(bookmarksByFolder).map((i, key) => {
  //   console.log(bookmarksByFolder['Imported From Firefox']);exit;
  // })
});


// Close Connection
// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }

//   console.log('DB connection closed');
// });

