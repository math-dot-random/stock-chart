/*
The below generated mysql INSERT statements were appended to the mysqldata.sql file execute this in the command line:
node stock-data-generator >> mysqldata.sql
*/

/*
This functions output will represent a months worth of stock data for 100 stocks
It will generate mysql INSERT statements for each stock
In total there are 51,000 rows in this table:
    1 month = 30 days (on average 21 trading days per month)
    1 data point every 30 minutes = 17 data points per day for an 8 hour day 9:00AM-5:00 PM ET
    total data points: 100*30*17=51,000
*/

var thirtyMinutePriceDataForOneMonth = () => {
    var count = 0;
    for (var i = 1; i <= 100; i++) {
        var number = (Math.random() * 100);
        for (var j = 1; j <= 5100; j++) {
            count++;
            var random = (Math.random());
            var price = random < 0.5 ? (number + (Math.random() * 5)) : (number - (Math.random() * 5));
            console.log(`INSERT INTO stock_price_history_one_month (id, stock_id, stock_price_for_thirty_minutes) VALUES (${count}, ${i}, ${price});`);
        }
    }
};


/*
This functions output will represent 5 years worth of stock data for 100 stocks
It will generate mysql INSERT statements for each stock
In total there are 126,000 rows in this table:
    1 year = 252 trading days
    1 data point every day = 252 data points
    5 years of data = 1,260 data points
    total data points: 100*252*5=126,000
*/


var oneDayDataFor5Years = () => {
    var count = 0;
    for (var i = 1; i <= 100; i++) {
        var number = (Math.random() * 100);
        for (j = 1; j <= 1260; j++) {
                count++;
                var random = (Math.random());
                var price = random < 0.5 ? number + (Math.random() * 5) : number - (Math.random() * 5);
            console.log(`INSERT INTO stock_price_history_five_years (id, stock_id, stock_price_for_one_day) VALUES (${count}, ${i}, ${price});`);
        }
    }

};

thirtyMinutePriceDataForOneMonth();
oneDayDataFor5Years();