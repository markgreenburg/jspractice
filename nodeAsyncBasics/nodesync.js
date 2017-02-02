const fs = require('fs');

const getLines = (path) => {
    const splitBuffer = fs.readFileSync(path).toString().split('\n'); 
    /* Optionally pass 'utf8' as second arg to readFileSync to get string */
    console.log(splitBuffer.length - 1);
};

getLines(process.argv[2]);
