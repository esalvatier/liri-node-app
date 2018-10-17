# liri-node-app
## Basic Summary
LIRI app built to use node.js. Allows users to select from movies, songs, or concerts, and retrieve results from the OMDB, Spotify, and Bands in Town API's respectively, though the app can also read from a file. All results are logged to terminal as well as being written to a log file.

## User Workflow
To start using the app, the user simply types 'node liri.js.'
Users can then select from the 'Movie,' 'Song,' 'Concert,' or 'Just do what it says.' options.
![app start](/Images/liriEX1.png)
![Option 1, Movie](/Images/liriEX1.png)
![Option 2, Song](/Images/liriEX2.png)
![Option 3, Concert](/Images/liriEX3.png)
![Option 4, do what is says in a file](/Images/liriEX4.png)

Once selected, the user will then be prompted to enter the name of the movie, song or artists they are looking for each respective option. 

Searching for a movie will result in the title, release year, ratings (from IMDB and Rotten Tomatoes if available), the country it was produced in, the language of the film, a summary of the plot, and the cast being displayed to the userin the terminal and being written to the log file.
![Movie Result](/Images/liriEXMovieResult.png)

Searching for a song will result in the artist or artists, song name, album name and possible a preview link being displayed to the terminal as well as being written to the log file. The first result from Spotify is displayed.
![Song Result](/Images/liriEXSongResult.png)

Searching for a artist's concerts results in the name of the venue, location and date for each upcoming result being display to the user and written to the log file.
![Concert Result](/Images/liriEXConcertResult.png)

The 'Just do what it says' option simply reads instructions from a file, currently the random.txt file included in this repository; those instructions must be formatted as an action to perform and a term to search. The two values must be seperate by a single comma and no spaces, in the order of "action,term;" and actions can only have the values of 'Movie' 'Song' or 'Concert'. Appropriate results will then be display to the terminal and written to the log file.
![Reading from a File](/Images/liriEXDoWhatItSaysResult.png)

The .js file must be run multiple times to get multiple results.
![Multiple Results](/Images/liriExMultipleResults.png)
