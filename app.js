const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set Static Path (for static resources. i.e css)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {    
    res.render('index');
});

const port = 3000;
app.listen(port, function() {
    console.log(`Now listening to port: ${port}`);
});