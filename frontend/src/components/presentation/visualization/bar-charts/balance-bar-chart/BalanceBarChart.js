import React from 'react';
import Bars from '../Bars';
import {max} from 'd3-array';
import AxisLeft from './AxisLeft';
import ZeroLine from '../ZeroLine';
import PropTypes from 'prop-types';
import AxisBottom from './AxisBottom';
import Slider from '../../../ui/slider/Slider';
import {scaleBand, scaleLinear} from 'd3-scale';


const BalanceBarChart = props => {
    const dimension = {width: 960, height: 500};
    const margin = {top: 20, right: 30, bottom: 65, left: 220};
    const innerWidth = dimension.width - margin.left - margin.right;
    const innerHeight = dimension.height - margin.top - margin.bottom;
    const {data, tickFormat, getTransition, appService,
        budgetService, currentCurrency, currencyStorage, setCurrentCurrency} = props;

    const yScale = scaleBand()
        .domain(data.map(d => d.month))
        .range([0, innerHeight])
        .paddingInner(0.15);

    const xScale = scaleLinear()
        .domain([0, max(data, d => d.value)])
        .range([0, innerWidth]);

    return (
        <div className={'statistic__balance-bar-chart'}>
            <div className={'statistic__balance-bar-chart--select'}>
                <Slider appService={appService} slides={currencyStorage} setCurrentCurrency={setCurrentCurrency}/>
            </div>
            {data.every(val => val.value === 0) ? <div className={'statistic__alarm'}>
                    {appService.checkLanguage() ? 'Нет данных' : 'There is no data'}
            </div> :
                <svg width={dimension.width} height={dimension.height}>
                    <g transform={`translate(${margin.left},${margin.top})`}>
                        <AxisBottom
                            xScale={xScale}
                            tickFormat={tickFormat}
                            innerHeight={innerHeight}

                        />
                        <AxisLeft yScale={yScale}/>
                        <ZeroLine height={innerHeight}/>
                        {
                            data.map((d, idx) => (
                                <React.Fragment key={idx}>
                                    <Bars
                                        xScale={xScale}
                                        yScale={yScale}
                                        xValue={d.value}
                                        yValue={d.month}
                                        color={'#203d4a'}
                                        getTransition={getTransition}
                                        budgetService={budgetService}
                                        currentCurrency={currentCurrency}
                                    />
                                </React.Fragment>
                            ))
                        }
                    </g>
                </svg>
            }
        </div>
    );
};


BalanceBarChart.propTypes = {
    data: PropTypes.array,
    tickFormat: PropTypes.func,
    appService: PropTypes.object,
    getTransition: PropTypes.func,
    budgetService: PropTypes.object,
    currencyStorage: PropTypes.array,
    currentCurrency: PropTypes.object,
    setCurrentCurrency: PropTypes.func
};


export default BalanceBarChart;