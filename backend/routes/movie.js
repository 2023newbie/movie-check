const express = require('express');

const movieRoutes = require('../controllers/movie')
const videoRoutes = require('../controllers/video')

const router = express.Router()

router.get('/', movieRoutes.getMovies)

router.get('/trending', movieRoutes.getTrending)

router.get('/toprating', movieRoutes.getTopRating)

router.get('/discover', movieRoutes.getByGenre)

router.get('/video', videoRoutes.getError)

router.get('/search', movieRoutes.getByKeyword)

router.get('/search/enhance', movieRoutes.getByQueries)

router.get('/video/:movieId', videoRoutes.getVideo)

module.exports = router