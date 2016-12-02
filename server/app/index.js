'use strict';
import path, {resolve} from 'path';
import express from 'express';

var User = require('../db/models').User;
import passport from 'passport';

const app = express();

// const env = require('path.join(rootPath, './server/env'));

// Export app
module.exports = app;

// Logging middleware
import logMiddleware from 'volleyball';
app.use(logMiddleware);

// Parsing middleware
import bodyParser from 'body-parser';
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({ extended: true }));

// Static middleware
import favicon from 'serve-favicon';
const faviconPath = path.join(__dirname, '../../public/favicon.ico');
const publicPath = path.join(__dirname, '../../public');

app.use(favicon(faviconPath));
app.use(express.static(publicPath));
// app.use('/bootstrap', express.static(resolve(__dirname, '..', '..', 'node_modules', 'bootstrap', 'dist')))
app.use('/materialize-css', express.static(resolve(__dirname, '..', '..', 'node_modules', 'materialize-css', 'dist')));
app.use('/jquery', express.static(resolve(__dirname, '..', '..',  'node_modules', 'jquery', 'dist')))

// PASSPORT MIDDLEWARE

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Routes that will be accessed via AJAX should be prepended with
// /api so they are isolated from our GET /* wildcard.
app.use('/api', require('./routes'));

// React-Router browserHistory requirement: this will handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).

app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, '../../browser/index.html'))
})

// Error catching endware.
app.use(function (err, req, res, next) {
    console.error(err, typeof next);
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});
