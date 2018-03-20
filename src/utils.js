const url = require('url');
const path = require('path');
const { createLogger, transports, format } = require('winston');
const { combine, timestamp, colorize, simple, json } = format;

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

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    json()
  ),
  transports: [
    new transports.File({ filename: resolve('src/logs/error.log'), level: 'error' }),
    new transports.File({ filename: resolve('src/logs/combined.log') })
  ],
  exceptionHandlers: [
    new transports.File({ filename: resolve('src/logs/exceptions.log') })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: combine(
      timestamp(),
      colorize({all: true}),
      simple()
    ),
    handleExceptions: true
  }));
}

module.exports = {
  getFavicon,
  removeDuplicates,
  resolve,
  logger
};
