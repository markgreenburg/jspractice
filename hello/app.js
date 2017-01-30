/*jslint
    es6
*/
"use strict";

/**
 * Add Express to the app and initialize a new express app
 */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'hbs');

/**
 * First route...send hello world to the front end
 */
app.get("/", (req, res) => {
    const data = {
        "name":"mark",
        "title": "hello page"
    };
    res.render("hello.hbs", data);
});

/**
 * We can use route parameters
 */
app.get("/hello/:name", (req, res) => {
    const name = req.params.name || 'world';
    res.send("Hello, " + name + "!");
});

/**
 * We can also use query string parameters to accomplish the same...
 */
app.get('/hello', (req, res) => {
    const name = req.query.name || 'world';
    res.send("Hello, " + name + "!");
});

/**
 * Can't do POSTs with Express by default so install body-parser and add it to
 * reqs at top of app, then put it in app.use.
 */
// app.post('/hello', function (req, res) {
//     let name = req.body.name || 'world';
//     res.json({
//         "message": "Hello " + name + "!"
//     });
// });


/**
 * Run the app
 */
app.listen(3000, () => console.log('running the express app'));