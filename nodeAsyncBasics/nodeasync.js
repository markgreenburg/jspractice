'use strict';

const fs = require('fs');

const getLines = (path, callback) => {
    fs.readFile(path, 'utf8', (err, fileContents) => {
        if (err) {
            console.log(err);
        }
        callback(fileContents.split('\n'));
    });
};

const logLines = (lineArray) => console.log(lineArray.length - 1);

getLines(process.argv[2], logLines);
