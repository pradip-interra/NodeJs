// imports
const { request, response } = require('express');
const movies = require('./datastore.d');  // our datastore
const express = require('express'); // this returns a function
const app = express();  // general convention to call it as app

app.use(express.json()); // for Joi


// REST endpoints implementation

// writting as explicit function. Can be written as fat arrow also
app.get('/', function (request, response) {
    response.send('Welcome');
});

// now implementing using fat arrow -> collection GET
app.get('/api/movies', (request, response) => {
    const myMovies = JSON.stringify(movies);
    response.send(`Movies we have: ${myMovies}`);  // this is the string interpolation notation, instead of "Movies we have" + movies
});

// Instance GET
app.get('/api/movies/:id', (request, response) => {
    const movie = getMovie(request);
    response.send(movie);
});

// POST call
app.post('/api/movies', (request, response) => {
    const error = validateMovie(request, response); // here only error field we are picking up
    if (error) {
        return;
    }

    const movie = {
        "id": movies.length + 1,
        "name": request.body.name,
        "genre": request.body.genre,
    }
    movies.push(movie);
    response.send(movie);
});

// PUT call
app.put('/api/movies/:id', (request, response) => {
    doEdit(request, response);
});

// PATCH
app.patch('/api/movies/:id', (request, response) => {
    doEdit(request, response);
});

function doEdit(request, response) {
    const error = validateMovie(request, response); // here only error field we are picking up
    if (error) {
        return;
    };

    const movie = getMovie(request);
    if (movie === null) {
        return;
    }
    movie.name = request.body.name;
    movie.genre = request.body.genre;

    response.send(movie);
}

// DELETE
app.delete('/api/movies/:id', (request, response) => {
    const movie = getMovie(request);
    if (movie === null) {
        return;
    }
    movies.splice(movies.indexOf(movie), 1);  // just deete one.
    response.send(movie);
});


// Validation
function validateMovie(request, response) {
    // One can add more checks here. Just putting one such to demonstrate.
    if (!request.body.name || request.body.name.length < 3) {
        return response.status(400).send("The name must be there.");
    }
}

function getMovie(request) {
    const movie = movies.find(movie => {
        if (movie.id == parseInt(request.params.id)) {
            return movie;
        }
    });
    if (!movie) {
        // sorry.
        response.status(404).send(`Movie with the Id ${request.params.id} could not found!`);
        return null;
    }
    return movie;
}

const port = process.env.PORT || 3000;  // if POST env variable is there then pick up that, else 3000
app.listen(port, () => {
    console.log(`Application is listening on port: ${port}`);
});
