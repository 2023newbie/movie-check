const fs = require('fs')
const path = require('path')

const p = path.join(path.dirname(require.main.filename), 'data', 'userToken.json')

module.exports = class UserToken {
    static all(cb) {
        fs.readFile(p, (err, fileContent) => {
            if (err) return cb([])
            cb(JSON.parse(fileContent))
        })
    }
}