
var mysql = require('mysql');
var mysqlConfig = require('./config.js');

var connection = mysql.createConnection(mysqlConfig);

//a model function that retrieves the stock price data for a specific stock for the 1 Day, 1 Week, and 1 Month graph types
const getOneDayWeekMonthData = (ticker, type, callback) => {
    var rows = 0;
    if(type === '1D') {
        rows = 17;
    } else if (type === '1W') {
        rows = 85;
    } else if (type === '1M') {
        rows = 340;
    }
    var query = `SELECT stock_price_for_thirty_minutes AS y FROM stock_info
    INNER JOIN stock_price_history_one_month
    ON stock_price_history_one_month.stock_id = stock_info.id
    WHERE stock_info.stock_ticker = "${ticker}" LIMIT ${rows}`;
    connection.query(query, (err, results) => {
        if (err) {
            callback(err);
        } else {
            callback(null, results);
        }
    })
};

//a function that retrieves the stock price data for a specific stock for the 3 Month, 1 Year, and 5 Years graph types
const getThreeMonthOneYearFiveYearData = (ticker, type, callback) => {
    var rows = 0;
    if(type === '3M') {
        rows = 15
    } else if (type === '1Y') {
        //need 85
        rows = 252;
    } else if (type === '5Y') {
        rows = 1,260;
    }
    var query = `SELECT stock_price_for_one_day AS y, stock_name AS name FROM stock_info
    INNER JOIN stock_price_history_five_years
    ON stock_price_history_five_years.stock_id = stock_info.id
    WHERE stock_info.stock_ticker = "${ticker}" LIMIT ${rows}`;
    connection.query(query, (err, results) => {
        if (err) {
            callback(err);
        } else {
            callback(null, results);
        }
    })

}

module.exports.getOneDayWeekMonthData = getOneDayWeekMonthData;
module.exports.getThreeMonthOneYearFiveYearData = getThreeMonthOneYearFiveYearData;

