import React from 'react';
const $ = require('jquery');
import StockChart from './StockChart.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            priceData:[],
            stockName: 'Tesla',
            date: new Date(),
            currentPrice: 0,
            closingPrice: 0,
            stockData: [],
            type: '1D',
            ticker: 'TSLA',
            market: 'Bull',
            color: ''
        }
        this.retrieveData = this.retrieveData.bind(this);
        this.handleGraphTypeChange = this.handleGraphTypeChange.bind(this);
        this.generateStockDataArray = this.generateStockDataArray.bind(this);
    }

    componentDidMount() {
        //retrieve the path and filename of current page
        let pathName = window.location.pathname.match(/\/stocks\/(\w+)/i);
        let ticker = pathName ? pathName[1] : null;
        if (ticker) {
           this.setState({ticker}, () => this.retrieveData());
        }
    }

    //a function that makes an http GET request using the ticker and graph type 
    retrieveData() {
        $.ajax({
            url: `/api/stocks/${this.state.ticker}/prices/${this.state.type}`,
            type: 'GET',
            success: (data) => {
                const currentPrice = data[data.length -1].price;
                const randomNum = Math.random()*5;
                const num = Number(randomNum.toFixed(2));
                const random = Math.random();
                const closingPrice = (random > 0.5) ? Number(currentPrice - num): Number(currentPrice + num);
                const market = (closingPrice > currentPrice) ? 'Bear' : 'Bull';
                const color = (market === 'Bull') ? '#21CE99': '#F45531';
                this.setState({
                    priceData: data,
                    stockName: data[0].name,
                    currentPrice: currentPrice,
                    closingPrice: closingPrice,
                    market: market,
                    color: color

                }, () => this.generateStockDataArray())
                console.log('GET request successful', data);
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

    //a function that updates the type and data on the state when the graph type is changed
    handleGraphTypeChange(event) {
        event.preventDefault();
        this.setState({
            type: event.target.name
        }, () => this.retrieveData())
    }

    //a function that creates a stock data object for each retrieved price data point
    generateStockDataArray() {
        let graphData = [];
        let today = this.state.date;
        let type = this.state.type;
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        let month;
        let schedule = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM']
        let months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC']
        const data = this.state.priceData.slice();
        if (type === '1D') {
            for (var i = 0; i < data.length; i++) {
                    graphData.push({dateString: `${schedule[i]} ET`, x: i, y: data[i].price});
            }
            this.setState({
                stockData: graphData
            })
        } else if (type === '1W') {
            for (var i = 0; i < data.length; i++) {
                graphData.push({dateString: `${schedule[i]}, ${month} ${dd} ET`, x: i, y: data[i].price});
            }
            this.setState({
                stockData: graphData
            })
        } else if (type === '1M') {
            for (var i = 0; i < data.length; i++) {
                graphData.push({dateString: `${schedule[i]}, ${month} ${dd} ET`, x: i, y: data[i].price});
            }
            this.setState({
                stockData: graphData
            })
        } else if (type ==='3M') {
            for (var i = 0; i < data.length; i++) {
                graphData.push({dateString: `${schedule[i]}, ${month} ${dd} ET`, x: i, y: data[i].price});
            }
            this.setState({
                stockData: graphData
            })
        } else if (type === '1Y') {
            for (var i = 0; i < data.length; i++) {
                graphData.push({dateString: today, x: i, y: data[i].price});
            }
            this.setState({
                stockData: graphData
            })
        } else if (type === '5Y') {
            for (var i = 0; i < data.length; i++) {
                graphData.push({dateString: today, x: i, y: data[i].price});
            }
            this.setState({
                stockData: graphData
            })
        }
    }

    render () {
        return (
            <div>
                <StockChart color={this.state.color} stockName={this.state.stockName} stockData={this.state.stockData} market={this.state.market} handleGraphTypeChange={this.handleGraphTypeChange} type={this.state.type} currentPrice={this.state.currentPrice} closingPrice={this.state.closingPrice}/>
            </div>

        )
    }
};

export default App;

