//Nothing fancy, just declaring & initializing stuff
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    server = require('http').createServer(app); 
var request = require('request');
var stdin = process.openStdin();
var crawler = require(__dirname + "/scripts/crawler");

var mongoose = require(__dirname + '/database');

stdin.addListener("data", function(data) { 
    var command = data.toString().trim();
    switch(command){
        case "crawlArtists": crawler.crawlArtists(); break;
        case "crawlSongOfArtists": crawler.crawlSongOfArtist(); break;
        case "crawlLyrics": crawler.crawlLyrics(); break;
        default: console.log("Unknown command or parameter: " + command); break;
    }
});

//Settings for local & Heroku IN THE SAME TIME (LoL)
app.set('port', (process.env.PORT || 5000));

//Cuz, you know, lyrics can be long :P
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());3

//Express is the BEST
var router = express.Router();

//Modulation programming - Enabled
app.use('/api', router);

//Directory of all template files, EJS over Angular <3
app.set('views', __dirname + '/pages');
app.set('view engine', 'ejs');

//Render only page, home page :P
app.get('/', function(request, response) {
    response.render('home');
});

//Redirect all paths to home one
app.post('/*', function(request, response) { 
    response.redirect('/');
});

//My code runs, yaaay
server.listen(app.get('port'), function() {
    console.log("It's up ^_^");
});

//This is too much for now
/*var newUser = require('./api/newUserAPI');*/