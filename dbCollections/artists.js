var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var artist = new Schema({
    id: Number,
    name: String,
    link: String,
    listOfSongs: [{
        songName: String,
        songLink: String,
        songLyrics: String
    }]
});

module.exports = mongoose.model("artist", artist);