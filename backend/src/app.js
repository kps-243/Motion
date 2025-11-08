const express = require('express'); // call express

const app = express();

app.use((req, res) => { // use in any request type
    res.json({ message : 'Votre requête à bien été reçu'}) // return a json response
})

module.exports = app;