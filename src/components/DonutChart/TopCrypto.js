import React from 'react';
import styles from './styles.scss';
import Chart from "react-apexcharts";

class TopCrypto extends React.Component {
    constructor(props) {
        super(props);

        this.options = {
            chart: {
                width: '400px',
                height: 380,
                type: "donut"
            },
            labels: ['BTC', 'GRAM', 'Others'],
            // colors: ['#F7931A', '#50AF95', '#D5D7DD'],
            fill: {
                type: 'gradient',
            },
            legend: {
                fontSize: '14px',
                fontFamily: 'Gilroy',
                fontWeight: 500,
                onItemClick: {
                    toggleDataSeries: false
                }
            },
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true,
                            name: {
                                show: true
                            },
                            value: {
                                show: false
                            },
                            total: {
                                showAlways: true,
                                show: true,
                                fontSize: 16,
                                fontFamily: 'Gilroy',
                                fontWeight: 600,
                                offsetY: 40,
                                label: 'Top crypto used',
                                formatter: function(val) {
                                    return;
                                }
                            }
                        }
                    }
                }
            },
            dataLabels: {
                enabled: false
            }
        };

        this.state = {
            series: [55, 41, 44]
        }
      }
    
    render() {
        return (
            <Chart
                options={ this.options }
                series={ this.state.series }
                type="donut"
            />
        );
    }
}

export default TopCrypto;