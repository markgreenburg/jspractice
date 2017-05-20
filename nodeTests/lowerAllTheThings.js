/**
 * Module takes all files within a given directory, and copies them to another 
 * given directory, while converting the filenames to all lowercase. 
 * Directories are specified via CLI arguments.
 */
const fs = require('fs');
const events = require('events');

/**
 * Extend Node event emitter to watch for files in a directory and emit events 
 * indicating those files need to be processed
 */
class Watcher extends events.EventEmitter {
  constructor(watchDir, processedDir) {
    super();
    this.watchDir = watchDir;
    this.processedDir = processedDir;
  }
  
  /**
   * Reads a directory and emits a 'process' event for each file therein
   */
  watch() {
    fs.readdir(this.watchDir, (err, files) => {
      if (err) throw err;
      for (let index in files) {
        this.emit('process', files[index]);
      }
    });
  }

  /**
   * Listens for changes on any files within the watch directory and calls the 
   * watch() emitter when a file is accessed
   */ 
  start() {
    fs.watchFile(this.watchDir, () => {
      this.watch();
    });
  }
}

// Instantiate a new directory watcher and convert a given directory's files
const watch = process.argv[2];
const processed = process.argv[3];
console.log('watching directory: ', watch);
console.log('output directory: ', processed);
const watcher = new Watcher(watch, processed);
watcher.on('process', (file) => {
  const watchFile = `${watch}/${file}`;
  const processedFile = `${processed}/${file.toLowerCase()}`;
  fs.rename(watchFile, processedFile, err => {
    if (err) throw err;
  });
});

watcher.start();
