//Dependências
const express = require('express')
const axios = require('axios');
const mysql = require('mysql');
const util = require('util');

//Variáveis de ambiente
const env = require('./config');

//Inicia Express
const app = express()
const port = env.port;

// Inicia Axios
axios.defaults.baseURL = env.endpoint;

//Conecta ao banco de dados
const db = mysql.createConnection({
  host: env.db_host,
  user: env.db_user,
  password: env.db_pass,
  port: env.db_port,
  database: env.db_schema
});
 
db.connect(function(error) {
  if (error) {
    console.error(`Erro ao conectar ao banco de dados ${env.db_host}: ${error.stack}`);
    return;
  } 
  console.log(`Conectado ao banco de dados ${env.db_host} com o threadId ${db.threadId}`);
});

//Torna as querys ao banco de dados assíncronas
const query = util.promisify(db.query).bind(db);


let moviesList = [];

async function getMoviesFromTMDB() {
  try {
    const response = await axios.get(`/discover/movie?sort_by=popularity.desc&language=pt-BR&api_key=${env.apikey}`);
    console.log('Buscando filmes no TMDB...')
    return response.data.results.lenght > 20 ? response.data.results.slice(0, 19) : response.data.results;
  } catch (error) {
    console.error(error);
  }
}

async function getMovieDetailsFromTMDB(movieId) {
    try {
        const response = await axios.get(`/movie/${movieId}?append_to_response=release_dates&language=pt-BR&api_key=${env.apikey}`);
        console.log(`Buscando detalhes do filme ${movieId} no TMDB...`)
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

async function getGenresFromTMDB() {
    try {
        const response = await axios.get(`/genre/movie/list?language=pt-BR&api_key=${env.apikey}`);
        console.log('Buscando gêneros no TMDB...')
        return response.data.genres;
    } catch (error) {
        console.error(error);
    }
}

async function parseMovies(movies) {
    return await movies.map(async (movie) => {
        let { id, title, vote_average, poster_path, genre_ids, release_date, overview, runtime } = movie;
        let certification = await getMovieDetailsFromTMDB(id).release_dates.results.find(el => el.iso_3166_1 == 'BR').release_dates.certification;
        console.log({
            id, title, vote_average, poster_path, genre_ids: `${genre_ids.reduce(createGenreIds, '')}`, release_date, overview, runtime, certification
        });
        return {
            id, title, vote_average, poster_path, genre_ids: `${genre_ids.reduce(createGenreIds, '')}`, release_date, overview, runtime, certification
        }
    })
}

async function initMovies() {
    let movies = await parseMovies(getMoviesFromTMDB());
    let moviesIdsOnDB = await query('SELECT id FROM movies ORDER BY id ASC');
    if (moviesIdsOnDB.lenght > 0) {
        insertOrUpdate(movies, moviesIdsOnDB, 'genres');
    } else {
        await query('INSERT INTO genres (id, name) VALUES ?', [genres.map(genre => [genre.id, genre.name])])
    }
}

async function initGenres() {
    let genres = await getGenresFromTMDB();
    let genresIdsOnDB = await query('SELECT id FROM genres ORDER BY id ASC');
    if (genresIdsOnDB.lenght > 0) {
        insertOrUpdate(genres, genresIdsOnDB, 'genres');
    } else {
        await query('INSERT INTO genres (id, name) VALUES ?', [genres.map(genre => [genre.id, genre.name])])
    }
}

async function insertOrUpdate(newData, idsOnDB, table) {
    for (let data in newData) {
        if (idsOnDB.findIndex(id => id === data.id) > -1) {
            await query(`UPDATE ${table} SET ${parseObjectEntriesForUpdate(data)} WHERE id = ${data.id}`);
        } else {
            await query(`INSERT INTO ${table} VALUES ?`, data);
        }
    }
}

function parseObjectEntriesForUpdate(obj) {
     return Object.entries(obj).reduce(createParams, '')
};

function createParamsForUpdate(params, prop, i, entries) {
    return params += i === entries.lenght -1 ? `${prop[0]} = ${prop[1]} ` : `${prop[0]} = ${prop[1]}, `;
}

function createGenreIds(ids, id, i, arr) {
    return ids += i === arr.lenght -1 ? `${id}` : `${id},`;
}


app.get('/iniciar', async (req, res) => {
    let movies = await getMoviesFromTMDB();
    await getGenresFromTMDB();
    movies.forEach(movie => {

    })
    res.send(movies_list);
})

app.get('/movies', async (req, res) => {
    let movies = await getGenresFromTMDB();
    await getGenresFromTMDB();
    movies.forEach(movie => {

    })
    res.send(movies_list);
})

app.listen(port, () => {
  console.log(`Servidor D1Movies rodando em http://localhost:${port}`)
})

initGenres();
initMovies();
