var path = require('path');
var cheerio = require('cheerio');
var request = require('request');
const artists = require(path.resolve(__dirname + "/..") + '/dbCollections/artists');
const url = "http://www.tekstoteka.com/index.php?sec=listing&artist=";

module.exports = {
    crawlArtists: function(){
        let currentToBeFetched;
        artists.countDocuments({}, function(err, count){
            if(err) return;
            currentToBeFetched = count + 2;
            request(url + currentToBeFetched, function(err, res, html){
                if(err){
                    console.log("Error fetching artist with ID: " + currentToBeFetched);
                    return;
                }
                var $ = cheerio.load(html);
                var title = $(".title").text();
                
                let newArtist = {
                    id: currentToBeFetched,
                    name: title,
                    link: url + currentToBeFetched 
                };
                console.log(currentToBeFetched);
                artists.findOneAndUpdate({name: title}, newArtist, {upsert: true, setDefaultsOnInsert: true}, function(err, doc){
                    if(err){
                        console.log("Error find/adding new artist: " + err);
                        return;
                    }
                    let listOfSongs = [];
                    $(".border tr").eq(1).find($("a")).each(function(){
                        listOfSongs.push({
                            songName: $(this).first().text(), 
                            songLink: $(this).attr('href')
                        });
                    });
                    artists.findOneAndUpdate({name: title}, {$set:{listOfSongs: listOfSongs}}, function(err2, docs2){
                        if(err2){
                            console.log("Error updating song list: " + err2);
                            return;
                        }
                        console.log("Song list successfully updated!");
                    });
                });                
            });
        });
    }
};
