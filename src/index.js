const chrome = require('./browsers/chrome');
const groupBy= require('lodash/groupBy');
// const db = require('./db');

// Create Database if not exists
// db.serialize(function () {
//   db.run('CREATE TABLE if not exists bookmarks (id INT, title TEXT, url TEXT, favicon TEXT, folder TEXT)');
// });

// const getChrome = chrome.getBookmarks(chrome.getDirectory(process.platform));

// const bookmarks = getChrome.then(bookmarks => {
//   const bookmarksByFolder = groupBy(bookmarks, 'folder');

//   Object.keys(bookmarksByFolder).map((i, key) => {
//     console.log(bookmarksByFolder['Imported From Firefox']);exit;
//   })
// });


// Close Connection
// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }

//   console.log('DB connection closed');
// });

const filePath = chrome.getDirectory(process.platform);

const lastModified = chrome.lastModified(filePath);

lastModified.then(data => {
  return new Promise((resolve, reject) => {
    if (data.modifiedSecondsAgo > 0) {
      resolve(data);
    } else {
      reject(new Error('File not modified yet'));
    }
  });
}).then((response) => {
  // process file
  console.info(response);
}).catch((error) => {
  console.log(error.message);
});



