const url = require('url');
const path = require('path');

const getFavicon = (link) => {
  if (link && link.length) {
    const o = url.parse(link);

    if (o) {
      const protocol = o.protocol;
      const hostname = o.hostname;

      return `${protocol}//${hostname}/favicon.ico`;
    }
  }

  return '';
};

const removeDuplicates = (array, prop) => {
  return array.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
};

const resolve = (dir) => {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  getFavicon,
  removeDuplicates,
  resolve
};
