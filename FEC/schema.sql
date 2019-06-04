/*Execute this file from the command line by typing:
 *    mysql -u root -p < schema.sql
 *  to create the database and the tables.*/

DROP DATABASE IF EXISTS robinhood_stock_chart;

CREATE DATABASE robinhood_stock_chart;

USE robinhood_stock_chart;


CREATE TABLE stock_info (
id INT NOT NULL AUTO_INCREMENT,
stock_name varchar(100) NOT NULL,
stock_ticker varchar(10) NOT NULL,
PRIMARY KEY (ID)
);

CREATE TABLE stock_price_history_one_month (
    id INT NOT NULL AUTO_INCREMENT,
    stock_id INT NOT NULL,
    stock_price_for_thirty_minutes decimal(10, 2) NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (stock_id) REFERENCES stock_info(id)
);

CREATE TABLE stock_price_history_five_years (
    id INT NOT NULL AUTO_INCREMENT,
    stock_id INT NOT NULL,
    stock_price_for_one_day decimal(10, 2) NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (stock_id) REFERENCES stock_info(ID)
);