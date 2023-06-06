const fs = require('fs')
const path = require('path')

const p = path.join(path.dirname(require.main.filename), 'data', 'genreList.json')

module.exports = class Genre {
    static getAll(cb) {
        fs.readFile(p, (err, fileContent) => {
            if (err) return cb([])
            const data = JSON.parse(fileContent)
            cb(data)
        })
    }

    static convertIdToName(id, cb) {
        fs.readFile(p, (err, fileContent) => {
            if (err) return cb([])
            const data = JSON.parse(fileContent)
            const dataGenre = data.find(genre => genre.id === id)
            if (dataGenre) {
                cb(dataGenre.name)
            } else {
                cb(undefined)
            }
        })
    }
}