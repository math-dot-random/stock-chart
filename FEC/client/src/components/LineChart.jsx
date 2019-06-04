import React from 'react';

class LineChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          hoverLocation: null,
          activePoint: null
        }

        this.getMinX = this.getMinX.bind(this);
        this.getMaxX = this.getMaxX.bind(this);
        this.getMinY = this.getMinY.bind(this);
        this.getMaxY = this.getMaxY.bind(this);
        this.getSvgX = this.getSvgX.bind(this);
        this.getSvgY = this.getSvgY.bind(this);

    }

// GET MAX & MIN X
//x min and max are the first and last values in the data array
  getMinX() {
    let data = this.props.stockData;
    if (data.length > 0) {
      return data[0].x;
    } else {
      return;
    }

  }
  getMaxX() {
    let data = this.props.stockData;
    if (data.length > 0) {
      return data[data.length - 1].x;
    } else {
      return;
    }
  }

// GET MAX & MIN Y
//a function that reduces the input data array and returns a minimum y value
  getMinY() {
    let data = this.props.stockData;
    if (data.length > 0) {
      return data.reduce((min, p) => p.y < min ? p.y : min, data[0].y);
    }
  }

  //a function that reduces the input data array and returns a maximum y value
  getMaxY() {
    let data = this.props.stockData;
    if (data.length > 0) {
    return data.reduce((max, p) => p.y > max ? p.y : max, data[0].y);
    } else {
      return;
    }
  }

  //LINE CHART COORDINATE HELPER FUNCTIONS

  //a function that creates an x coordinate point
  getSvgX(x) {
    let {svgWidth} = this.props;
    return (x / this.getMaxX() * svgWidth);
  }

  //a function that creates an y coordinate point
  getSvgY(y) {
    let {svgHeight} = this.props;
    return svgHeight - (y / this.getMaxY() * svgHeight);
  }

  //MAKE PATH
  //a function that creates the svg line graph by generating the html path
  makePath() {
    let data = this.props.stockData;
    if (!data.length) {
      return;
    } else {
      let pathD = "M " + this.getSvgX(data[0].x) + " " + this.getSvgY(data[0].y) + " ";
      pathD += data.map((point) => {
        return "L " + this.getSvgX(point.x) + " " + this.getSvgY(point.y) + " ";
      });
          return (
              <path className="stock_chart_path" d={pathD} style={{stroke: this.props.color, strokeWidth: 2, fill: "none"}} />
          );
      }
  }

    //Create Dotted Data Point Line
    makeDottedAxis() {
        const minX = this.getMinX();
        const maxX = this.getMaxX();
        const minY = this.getMinY();
        const maxY = this.getMaxY();
        return (
          <g className="stock_chart_axis">
            <line
              style={{stroke: "black", strokeWidth: 1, fill: "none", strokeDasharray:`1, ${676/(this.props.stockData.length)}`, strokeDashoffset: 0}}
              x1={this.getSvgX(minX)}
              x2={this.getSvgX(maxX)}
              y1={this.getSvgY(minY)}
              y2={this.getSvgY(minY)} />
          </g>
          );
      }

      //a function that calculates the coordinates
      getCoordinates(event){
        let data = this.props.stockData;
        const svgLocation = document.getElementById("stock-chart-app").getBoundingClientRect();
        const adjustment = (svgLocation.width - this.svgWidth) / 2;
        //clientX-Get the horizontal coordinate when the mouse is on an element
        const relativeLocation = event.clientX - svgLocation.left - adjustment;
        let svgData = [];
        data.map(point => {
          svgData.push({
            svgX: this.getSvgX(point.x),
            svgY: this.getSvgY(point.y),
            position: point.x,
            price: point.y
          });
        });

        let closestPoint = {};
        let count = 500;
        for (let i = 0; i < svgData.length; i++) {
          if (Math.abs(svgData[i].svgX - this.state.hoverLocation) <= count ) {
            count = Math.abs(svgData[i].svgX - this.state.hoverLocation);
            closestPoint = svgData[i];
          }
        }

        if(relativeLocation < 0){
          this.stopHover();
        } else {
          this.setState({
            hoverLocation: relativeLocation,
            activePoint: closestPoint
          })
          //call a function that handles price change with hovering
        }
      }

      // STOP HOVER
      stopHover(){
        this.setState({hoverLocation: null, activePoint: null});
        //call a function that handles price change with hovering
      }


      //a function that makes the point on hovering
      makeActivePoint() {
        const radius = 4;
        return (
          <circle
            className='stock-chart-point'
            style={{stroke: this.props.color}}
            r={radius}
            cx={this.state.activePoint.svgX}
            cy={this.state.activePoint.svgY}
          />
        );
      }

      //a function that creates the hover line
      makeHoverLine() {
        return (
          <line className='hover-line'
            x1={this.state.hoverLocation}
            x2={this.state.hoverLocation}
            y1={0}
            y2={this.props.svgHeight} />
        )
      }


    render() {
        const {svgHeight, svgWidth} = this.props;
        const scaledHeight = svgHeight / 2.0;
        const graph = this.props.stockData.length ? (<svg viewBox={`0 0 ${svgWidth} ${svgHeight + 15}`} >
          {this.makePath()}
          {this.makeDottedAxis()}
          {this.state.hoverLocation ? this.makeHoverLine() : null}
          {this.state.hoverLocation ? this.makeActivePoint() : null}
        </svg>) : (<div> Graph Currently Unavailable </div>);
        return (
            <div>
              {graph}
            </div>
        )
    }
}

LineChart.defaultProps = {
  svgHeight: 196,
  svgWidth: 676
}

  export default LineChart;