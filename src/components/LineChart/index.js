import React from 'react';
import styles from './styles.scss';
import Chart from "react-apexcharts";

class LineChart extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            options: {
            chart: {
                width: "600px",
                height: 380,
                type: "bar"
                },
            xaxis: {
                categories: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug']
            },
            stroke: {
                curve: 'smooth'
            },
            markers: {
                size: 0,
            }
            },
            series: [
            {
                name: "Value",
                data: [750, 850, 250, 300, 275, 510, 600, 800]
            }
            ]
        };
    }
    
    render() {
        return (
            <div className={ styles.wrapper }>
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    height="250px"
                />
            </div>
        );
    }
}

export default LineChart;