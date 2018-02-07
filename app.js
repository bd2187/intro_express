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

var users = [
    {
        first_name: 'john',
        last_name: 'doe',
        email: 'johndoe@gmail.com',
        id: 1
    },
    {
        first_name: 'jane',
        last_name: 'doe',
        email: 'janedoe@gmail.com',
        id: 2
    },
    {
        first_name: 'bill',
        last_name: 'doe',
        email: 'billdoe@gmail.com',
        id: 3
    },
];

app.get('/', function(req, res) {    
    res.render('index', {
        title: 'Sample Title',
        users
    });
});

const port = 3000;
app.listen(port, function() {
    console.log(`Now listening to port: ${port}`);
});