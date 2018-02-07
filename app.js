const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var expressValidator = require('express-validator');

var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set Static Path (for static resources. i.e css)
app.use(express.static(path.join(__dirname, 'public')));

// Express Validator middleware
app.use(expressValidator());

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

var foo = users.map(function(obj) {
    obj.first_name = obj.first_name[0].toUpperCase() + obj.first_name.slice(1).toLowerCase();
    obj.last_name = obj.last_name[0].toUpperCase() + obj.last_name.slice(1).toLowerCase();
    return obj;
});

app.get('/', function(req, res) {

    res.render('index', {
        title: 'Users',
        users: foo
    });
});

app.post('/users/add', function(req, res) {

    req.checkBody('first_name', 'First name is required').notEmpty();
    req.checkBody('last_name', 'Last name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();

    var errors = req.validationErrors();

    if (errors) {

        res.render('index', {
            title: 'Users',
            users: foo,
            errors
        });

    } else {
        var newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        };

        console.log('Success!');
    }



    res.end();
});

const port = 3000;
app.listen(port, function() {
    console.log(`Now listening to port: ${port}`);
});