const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../db/index.js')

const app = express();

var port = 3001;

app.use(express.static(path.join(__dirname + '/../public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
});

//at this path, load this webpage
app.get('/stocks/:stock', (req, res) => {
    res.sendFile(path.join(__dirname, '/../public/index.html'));
  });

//at this path, load this webpage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../public/index.html'));
  });


//GET request for stock price data
app.get('/api/stocks/:ticker/prices/:type', (req, res) => {
    let ticker = req.params.ticker.toUpperCase();
    if (req.params.type === '1D' || req.params.type === '1W' || req.params.type === '1M') {
        db.getOneDayWeekMonthData(ticker, req.params.type, (err, results) => {
            if (err) {
                res.status(500);
                res.send(err);
            } else {
                res.status(200);
                res.send(results);
            }
        })
    } else if (req.params.type === '3M' || req.params.type === '1Y' || req.params.type === '5Y') {
        db.getThreeMonthOneYearFiveYearData(ticker, req.params.type, (err, results) => {
            if (err) {
                res.status(500);
                res.send(err);
            } else {
                res.status(200);
                res.send(results);
            }
        })
    }
})

//GET request for stock price data
app.get('/', (req, res) => {
    if (req.params.type === '1D' || req.params.type === '1W' || req.params.type === '1M') {
        db.getOneDayWeekMonthData(req.params.ticker, req.params.type, (err, results) => {
            if (err) {
                res.status(500);
                res.send(err);
            } else {
                res.status(200);
                res.send(results);
            }
        })
    } else if (req.params.type === '3M' || req.params.type === '1Y' || req.params.type === '5Y') {
        db.getThreeMonthOneYearFiveYearData(req.params.ticker, req.params.type, (err, results) => {
            if (err) {
                res.status(500);
                res.send(err);
            } else {
                res.status(200);
                res.send(results);
            }
        })
    }
})



