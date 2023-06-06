const express = require('express')
const cors = require('cors')

const app = express()

const movieRoutes = require('./routes/movie')
const UserToken = require('./models/UserToken')
const searchEnhanceRoute = require('./routes/search-enhance')

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    const userId = req.headers.userid
    const token = req.headers.token
    
    UserToken.all((data) => {
        const checkedUserId = data.find(item => item.userId === userId)
        if (!checkedUserId) {
            res.status(401).send({message: 'Unauthorized'})
        } else {
            if (checkedUserId.token !== token) {
                res.status(401).send({message: 'Unauthorized'})
            } else {
                next()
            }
        }
    })
})

app.use('/searchfielddata', searchEnhanceRoute)
app.use('/api/movies', movieRoutes)

app.use((req, res, next) => {
    res.status(404).send({message: "Route not found."})
})

app.listen(5000)