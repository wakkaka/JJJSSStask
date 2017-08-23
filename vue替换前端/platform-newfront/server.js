const express = require('express')
const index = require('./router/index')

const app = express()

app.use(express.static('dist'))
app.use('/',index)


app.listen(80, '10.170.50.221')

module.exports = app