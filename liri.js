require("dotenv").config();
var Spotify = require('node-spotify-api');
var keyVar = require("./keys");
var inquirer = require("inquirer");
var request = require("request");
var moment = require('moment');
var fs = require("fs");
var spotify = new Spotify(keyVar.spotify)

function logging(content) {
  content += "\n==============================================";
  fs.appendFile("log.txt", content, function (err) {
    if (err) {
      console.log(err);
    }
  })
}



function readInstruct(action, term) {
  switch (action) {
    case "Movie":
      omdbRequest(term, action);
      break
    case "Song":
      spotifyRequest(term);
      break
    case "Concert":
      bITRequest(term, action);
      break
  }
}

function prompt() {
  var choices = {
    type: "list",
    message: "What are you looking for?",
    choices: ["Movie", "Song", "Concert", "Just do what it says."],
    name: "action"
  };
  var search = {
    type: "input",
    message: "Enter the name of what you are looking for: ",
    name: "search"
  }
  inquirer.prompt([choices, search]).then(function (userInput) {
    if (userInput.action === "Just do what it says.") {
      fs.readFile("random.txt", "utf8", function (error, data) {
        var instructionsArr = data.split(",");
        readInstruct(instructionsArr[0], instructionsArr[1]);
      })
    } else {
      readInstruct(userInput.action, userInput.search);
    }
  })
}

function queryConstruct(searchTerm, destination) {
  switch (destination) {
    case "Movie":
      return "http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy";
    case "Concert":
      return "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp";
  }
}

function omdbRequest(movie, action) {
  if (movie === "") {
    movie = "Mr. Nobody";
  }
  var queryURL = queryConstruct(movie, action);
  request(queryURL, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var result = JSON.parse(body);
      if (result.hasOwnProperty("Error")) {
        console.log("I'm sorry, " + movie + " could not be found.");
      } else {
        var omdbResult = "\nTitle: " + result.Title + "\nRelease Date: " + result.Year + "\nIMDB Rating: " + result.Ratings[0].Value;
        if (result.Ratings[1]) {
          omdbResult += "\nRotten Tomatoes Rating: " + result.Ratings[1].Value;
        } 
        omdbResult += "\nCountry(s): " + result.Country + "\nLanguage(s): " + result.Language + "\nPlot Summary: " + result.Plot + "\nCast: " + result.Actors;
        console.log(omdbResult);
        logging(omdbResult);
      }
    } else {
      console.log(error);
    }
  });
}

function bITRequest(artist, action) {
  var bITResult = "";
  fs.appendFile("log.txt", "\nResults for: " + artist + "\n", function (err) {
    if (err) {
      console.log(err);
    }
  });
  var queryURL = queryConstruct(artist, action);
  request(queryURL, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      if (!body.includes("warn")) {
        var result = JSON.parse(body);
        result.forEach(function (current) {
          var loc = "";
          if (current.venue.region.length > 0) {
            loc = current.venue.region;
          } else {
            loc = current.venue.country;
          }
          var time = moment(current.venue.datetime).format("MM/DD/YYYY");
          bITResult = "\nName of Venue: " + current.venue.name + "\nLocation: " + current.venue.city + ", " + loc + "\nEvent Date: " + time;
          console.log(bITResult);
          logging(bITResult);
        })
      } else {
        bITResult = "No results were found, try modifying your request."
      }
      console.log(bITResult);
      logging(bITResult);
    } else {
      console.log(error);
    }
  });
}

function spotifyRequest(song) {
  if (song === "") {
    song = "The Sign";
  }
  fs.appendFile("log.txt", "\nResult for: " + song + "\n", function (err) {
    if (err) {
      console.log(err);
    }
  });
  spotify.search({
    type: 'track',
    query: song,
    limit: 5
  }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    var names = "";
    names += data.tracks.items[0].artists[0].name;
    if (data.tracks.items[0].artists.length > 1) {
      for (var i = 1; i < data.tracks.items[0].artists.length; i++) {
        names += ", " + data.tracks.items[0].artists[i].name;
      }
    }
    var spotifyResults = "\nArtist(s): " + names + "\nSong Name: " + data.tracks.items[0].name + "\nPreview URL: " + data.tracks.items[0].preview_url + "\nAlbum Name: " + data.tracks.items[0].album.name;
    console.log(spotifyResults);
    logging(spotifyResults);
  });
}

prompt();