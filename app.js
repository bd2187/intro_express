const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

var app = express();

app.get('/', function(req, res) {
    res.send('Hello World!');
});

const port = 3000;
app.listen(port, function() {
    console.log(`Now listening to port: ${port}`);
});