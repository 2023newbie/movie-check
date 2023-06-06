const { json } = require('express')
const Video = require('../models/Video')

exports.getVideo = (req, res, next) => {
    const movieId = +req.params.movieId
    
    // if not movieId, throw error
    if (!movieId) {
        throw json({message: "Not found film_id parram"}, {status: 400})
    }

    // if movieId exist, check
    Video.getTrailer(movieId, (data => {
        // if id exist, return data
        if (Object.keys(data).length > 0) {
            res.status(200).send(data)
            
        // else, return error
        } else {
            res.status(404).send({})
        }
    }))
}

exports.getError = (req, res, next) => {
    res.status(400).send({message: 'Not found film_id parram'})
}