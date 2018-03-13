const chrome = require('./browsers/chrome');
const filePath = chrome.getDirectory(process.platform);
const DB = require('./models');
const python = require('python-shell');
const {resolve} = require('./utils');

function timers (time) {
  return new Promise((resolve, reject) => {
    python.run('my_time.py', {
      args: [time],
      scriptPath: resolve('src')
    }, function (err, result) {
      if (err) reject(err);

      resolve(result);
    });
  });
}

async function getFilteredBookmarks() {
  const fileModified = await chrome.lastModified(filePath);
  const bookmarks = await chrome.getBookmarks(filePath);
  const dbHistory = await getHistory();
  const dbLastModified = dbHistory.result ? dbHistory.result * 10000: 0;
  const data = bookmarks.filter(bookmark => bookmark.date_added >= 0);
  const book = data[data.length-1].date_added;

  const timer = await timers(book);

  console.log(timer);
}



async function saveBookmark(bookmark) {
  let saveData = DB.bookmark.findOrCreate({
    where: {
      url: bookmark.url
    },
    defaults: {
      title: bookmark.title,
      url: bookmark.url,
      favicon: bookmark.favicon,
      folder: bookmark.folder,
      bookmark_id: bookmark.id,
      type: bookmark.type,
      date_added: bookmark.date_added,
      date_modified: bookmark.date_modified,
      sync_transaction_version: bookmark.sync_transaction_version
    }
  }).spread((mark, created) => {
    return Promise.resolve(true);
  });
}

async function saveHistory(timestamp) {
  DB.history.findOrCreate({
    where: {
      last_updated: timestamp
    },
    defaults: {
      last_updated: timestamp
    }
  });
}

async function getHistory() {
  let data = {};
  await DB.history.findOne({
    order: [
      ['last_updated', 'DESC']
    ]
  }).then((res) => {
    data.result = +(res && res.dataValues && res.dataValues.last_updated);
  }).catch((error) => {
    data.error = error.message;
  });

  return data;
}

async function processBookmarks() {

  const filteredBookmarks = await getFilteredBookmarks();

  console.log(filteredBookmarks);

  // let interval = 0.3 * 1000; // 10 seconds;

  // for (var i = 0; i <=filteredBookmarks.length-1; i++) {
  //     setTimeout( function (i) {
  //         saveBookmark(filteredBookmarks[i]);
  //     }, interval * i, i);
  // }

  // const timestamp = (new Date()).getTime();
  // await saveHistory(timestamp);


}

processBookmarks();
