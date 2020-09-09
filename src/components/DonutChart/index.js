import React from 'react';
import styles from './styles.scss';
import Chart from "react-apexcharts";

// charts
import TopFiat from './TopFiat';
import TopCrypto from './TopCrypto';

class DonutChart extends React.Component {
    constructor(props) {
        super(props);

        this.options = {
            chart: {
                width: '400px',
                height: 380,
                type: "donut"
            },
            labels: ['USD', 'RUB', 'Others'],
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
                                label: 'Top fiat used',
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
            series: [44, 55, 41]
        }
    
        // this.state = {
        //   options: {
        //     chart: {
        //         type: 'donut'
        //     },
        //     plotOptions: {
        //       pie: {
        //         donut: {
        //           size: '55%',
        //           labels: {
        //             show: true,
        //             name: {
        //               formatter: function (val) {
        //                 return 'Top fiat used';
        //               },
        //               color: 'black',
        //               offsetY: '12',
        //               fontSize: '20',
        //               fontFamily: 'Gilroy',
        //               fontWeight: 'bold'
        //             },
        //             value: {
        //               show: false
        //             }
        //           }
        //         }
        //       }
        //     },
        //     legend: {
        //         position: "bottom"
        //     }
        //   },
        //   series: [44, 55, 41, 17, 15],
        //   labels: ['A', 'B', 'C', 'D', 'E']
        // }
      }
    
    render() {
        return (
            <div className={ styles.wrapper }>
                <TopFiat />
                <TopCrypto />
            </div>
        );
    }
}

export default DonutChart;