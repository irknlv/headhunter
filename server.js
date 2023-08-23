const express = require('express');
const logger = require('morgan')
const passport = require('passport')

const app = express();

app.use(logger('dev'))
app.use(express.urlencoded())
app.use(express.json())
app.use(passport.initialize())
app.use(express.static(__dirname + '/public'))
require('./app/auth/passport')

app.get('/', (req, res) => {
    res.send("ok")
})

app.use(require('./app/auth/routes'))
app.use(require('./app/region/routes'))
app.use(require('./app/skill/routes'))
app.use(require('./app/employmentType/routes'))
app.use(require('./app/languages/routes'))
app.use(require('./app/resume/routes'))
app.use(require('./app/specialization/routes'))
app.use(require('./app/vacancy/routes'))
app.use(require('./app/apply/routes'))

const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on PORT ${port}`)
})