'use strict';

var express = require('express');
var app = express();
var lodash = require('lodash');

var authors = [{ id: 1, firstName: 'Tom', lastName: 'Coleman' }, { id: 2, firstName: 'Sashko', lastName: 'Stubailo' }, { id: 3, firstName: 'Mikhail', lastName: 'Novikov' }];
var posts = [{ id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 }, { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 }, { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 }, { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 }];

app.get('/authors', function (req, res) {
    res.json(authors);
});

app.get('/posts', function (req, res) {
    res.json(posts);
});

app.get('/author/:id', function (req, res) {
    var result = lodash.find(authors, { id: Number(req.params.id) });
    res.json(result);
});

app.get('/post/:id', function (req, res) {
    var result = lodash.find(posts, { id: parseInt(req.params.id) });
    res.json(result);
});

app.listen(4000);
//# sourceMappingURL=rest.js.map