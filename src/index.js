const chrome = require('./browsers/chrome');
const DB = require('./db');
const filePath = chrome.getDirectory(process.platform);
const db = new DB();
async function getFilteredBookmarks() {
  const fileModified = await chrome.lastModified(filePath);
  const bookmarks = await chrome.getBookmarks(filePath);
  const dbLastModified = 0; //13149532622711806
  return bookmarks.filter(bookmark => bookmark.date_modified >= dbLastModified);
}

async function processBookmarks() {
  const filteredBookmarks = await getFilteredBookmarks();

  console.log(filteredBookmarks);
}

processBookmarks();
