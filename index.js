const express = require("express")
var path = require('path');

var app = express()
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 3000);

app.get("/", function (request, response) {
    response.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(app.get('port'), () => {
    console.log(`✅ App listening at http://localhost:${port}`)
})

module.exports = app;