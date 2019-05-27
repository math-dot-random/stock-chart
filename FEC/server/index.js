const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../db/index.js')

const app = express();

var port = 3001;

app.use(express.static(path.join(__dirname + '/../public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log('Server is listening on port 3001')
});

//at this path, load this webpage
app.get('/stocks/:stock', (req, res) => {
    res.sendFile(path.join(__dirname, '/../public/index.html'));
  });

//GET request for stock price data 
app.get('/api/stocks/:ticker/prices/:type', (req, res) => {
    db.getOneDayData(req.params.ticker, req.params.type, (err, results) => {
        if (err) {
            res.status(500);
            res.send(err);
        } else {
            res.status(200);
            res.send(results);
        }
    })
})



