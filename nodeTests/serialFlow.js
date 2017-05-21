/**
 * Example implementation of serial control flow
 */

const fs = require('fs');
const request = require('request');
const htmlparser = require('htmlparser');
const configFileName = './rss_feeds.txt';

/**
 * Checks that a config text file is specified
 */
const checkForRSSFile = () => {
  fs.exists(configFileName, exists => {
    if (!exists) {
      return next(new Error(`Missing RSS file: ${configFileName}`))
    }
    next(null, configFileName);
  });
}

/**
 * Reads the config file and picks a random URL to fetch
 * @param {String} configFileName config txt file containing one line per URL
 */
const readRSSFile = configFileName => {
  fs.readFile(configFileName, (err, feedList) => {
    if (err) return next(err);
    feedList = feedList
      .toString()
      .replace(/^\s+|\s+$/g, '')
      .split('\n');
    const random = Math.floor(Math.random() * feedList.length);
    next(null, feedList[random]);
  });
}

/**
 * Fetches contents for the random URL picked from config file and handles any 
 * fetch errors. Passes contents to next function if fetch succeeds
 * @param {String} feedUrl random URL picked from the config file
 */
const downloadRSSFeed = feedUrl => {
  request({ uri: feedUrl }, (err, res, body) => {
    if (err) return next(err);
    if (res.statusCode !== 200) {
      return next(new Error('Got bad response code'));
    }
    next(null, body);
  });
}

/**
 * Takes the RSS response body object, parses it, and logs the title + link to 
 * the console
 * @param {Object} rss response body object
 */
const parseRSSFeed = rss => {
  const handler = new htmlparser.RssHandler();
  const parser = new htmlparser.Parser(handler);
  parser.parseComplete(rss);
  if (!handler.dom.items.length) { return next(new Error('No RSS Found')) }
  const item = handler.dom.items.shift();
  console.log(item.title);
  console.log(item.link);
}

/**
 * Executes control flow
 * @param {Object} err 
 * @param {Object} result 
 */
const next = (err, result) => {
  if (err) throw err;
  const currentTask = tasks.shift();
  if (currentTask) { currentTask(result) }
}

// Assemble control flow
const tasks = [checkForRSSFile, readRSSFile, downloadRSSFeed, parseRSSFeed];

// Execute the flow
next();
