
var path = require('path');
var artists = require(path.resolve(__dirname + "/..") + '/dbCollections/artists');
var url = "http://www.tekstoteka.com/index.php?sec=listing&artist=";
var cheerio = require('cheerio');
var request = require('request');

module.exports = {
    crawlArtists: function(){
        var currentToBeFetched = artists.count({});
        //url + (currentToBeFetched + 1)
        request(url + 2, function(err, res, html){
            if(err){
                console.log("Error fetching artist with ID: " + currentToBeFetched);
                return;
            }
            var $ = cheerio.load(html);
            var title = $(".title").text();
            var songsMapped = $(".border tr").eq(1).html();
            console.log(songsMapped);
            console.log(title);
        });
    }
};
