const Genre = require('../models/Genre')
const MediaType = require('../models/MediaType')

module.exports = (req, res, next) => {
    Genre.getAll((genres) => {
        MediaType.all((mediaTypes) => {
            res.status(200).send({genres: genres, mediaTypes: mediaTypes})
        })
    })
}