const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

var app = express();

// Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set Static Path (for static resources. i.e css)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    console.log('hello world');
    res.send('Hello World!');
});

const port = 3000;
app.listen(port, function() {
    console.log(`Now listening to port: ${port}`);
});