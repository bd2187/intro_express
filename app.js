const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const mongojs = require('mongojs');
const ObjectId = mongojs.ObjectId;
const DATABASE = require('./constants').DATABASE;
const db = mongojs(DATABASE, ['users']);

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

// Global Variables
app.use(function(req, res, next) {
    res.locals.errors = null;
    res.locals.users = null;
    next();
});

// Express Validator middleware
app.use(expressValidator());

app.get('/', function(req, res) {
    db.users.find(function (err, docs) {
        res.render('index', {
            title: 'Users',
            users: docs
        });
    });
});

app.post('/users/add', function(req, res) {

    req.checkBody('first_name', 'First name is required').notEmpty();
    req.checkBody('last_name', 'Last name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();

    var errors = req.validationErrors();

    if (errors) {

        res.end('error');
        // res.render('index', {
        //     title: 'Users',
        //     users: users,
        //     errors: errors
        // });

    } else {
        var newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        };

        db.users.insert(newUser, (err, result) => {
            if (err) {
                console.log(err);
            }            
        });

        res.redirect('/');
    }

    res.end();
});

app.delete('/users/delete/:id', function(req, res) {
    
    db.users.remove({_id: ObjectId(req.params.id)}, function(err, result) {
        if (err) {
            console.log(err);
        }        
    });

    res.redirect('/');
});

const port = 3000;
app.listen(port, function() {
    console.log(`Now listening to port: ${port}`);
});