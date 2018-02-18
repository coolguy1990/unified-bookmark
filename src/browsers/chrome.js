const fs = require('fs');
const os = require('os');
const path = require('path');
const utils = require('../utils');

const getDirectory = (platform, profile = 'Default') => {
  switch (platform) {
    case 'darwin':
      return path.join(
        os.homedir(),
        'Library',
        'Application Support',
        'Google',
        'Chrome',
        profile,
        'Bookmarks'
      );
      break;
    default:
      return '';
  }
};

const normalize = item => ({
  title: item.name,
  url: item.url,
  favicon: utils.getFavicon(item.url),
  folder: item.folder || '',
  id: item.id,
  date_added: item.date_added || 0,
  date_modified: item.date_modified || 0,
  sync_transaction_version: item.sync_transaction_version || 0,
  type: item.type || ''
});

const getChildren = (children) => {
  let bookmarks = [];

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child.type === 'folder') {
      const gc = getChildren(child.children);
      for (let j = 0; j < gc.length; j++) {
        const fgc = Object.assign({}, gc[j], {
          folder: child.name,
          date_added: child.date_added,
          id: child.id,
          date_modified: child.date_modified
        });
        bookmarks.push(fgc);
      }
    } else {
      bookmarks.push(child);
    }
  }

  return bookmarks;
};

const getBookmarks = file => new Promise((resolve) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      resolve([]);
    } else {
      const jsonData = JSON.parse(data);
      if (jsonData.roots) {
        let bookmarks = [];
        let keys = Object.keys(jsonData.roots);
        for (let i = 0; i < keys.length; i++) {
          const folder = keys[i];
          const rootObject = jsonData.roots[folder];
          const children = rootObject.children ? getChildren(rootObject.children) : [];

          if (children.length) {
            for (let j = 0; j < children.length; j++) {
              bookmarks.push(children[j]);
            }
          }
        }

        const nb = new Array(bookmarks.length);
        for (let i = 0; i < bookmarks.length; i++) {
          nb[i] = normalize(bookmarks[i]);
        }

        const dups = utils.removeDuplicates(nb, 'url');
        resolve(dups);
      } else {
        resolve([]);
      }
    }
  });
});

module.exports = {
  getDirectory,
  normalize,
  getBookmarks,
  getChildren
};
