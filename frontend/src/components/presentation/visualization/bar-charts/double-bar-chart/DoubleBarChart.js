import React from 'react';
import Bars from '../Bars';
import {max} from 'd3-array';
import PropTypes from 'prop-types';
import ZeroLine from '../ZeroLine';
import AxisBottom from './AxisBottom';
import ColorLegend from './ColorLegend';
import Slider from '../../../ui/slider/Slider';
import {scaleBand, scaleLinear, scaleOrdinal} from 'd3-scale';


const DoubleBarChart = props => {
    const dimension = {width: 960, height: 500};
    const margin = {top: 20, right: 170, bottom: 40, left: 200};
    const innerWidth = dimension.width - margin.right - margin.left;
    const innerHeight = dimension.height - margin.top - margin.bottom;
    const {data, tickFormat, getTransition, appService,
        budgetService, currentCurrency, currencyStorage, setCurrentCurrency} = props;
    const color = scaleOrdinal().domain(data.map(d => d.type)).range(['#203d4a', '#FF5049']);


    const yZeroScale = scaleBand()
        .domain(data.map(d => d.month))
        .range([0, innerHeight])
        .paddingInner(0.1)
        .paddingOuter(0);

    const xScale = scaleLinear()
        .domain([0, max(data, d => d.value)])
        .range([0, innerWidth]);

    const colorScale = scaleBand()
        .domain(data.map(d => d.type));

    return (
        <div className={'statistic__double-bar-chart'}>
            <div className={'statistic__double-bar-chart--select'}>
                <Slider
                    name={'currency'}
                    appService={appService}
                    slides={currencyStorage}
                    setCurrentCurrency={setCurrentCurrency}
                />
            </div>

            {data.every(val => val.value === 0) ? <div className={'statistic__alarm'}>
                {appService.checkLanguage() ? 'Нет данных' : 'There is no data'}
            </div> :
                <svg width={dimension.width} height={dimension.height}>
                    <g transform={`translate(${50}, ${margin.top})`}>
                        <ColorLegend color={color} margin={margin} colorScale={colorScale}/>
                    </g>
                    <g transform={`translate(${margin.left}, ${margin.top})`}>
                        <AxisBottom
                            xScale={xScale}
                            tickFormat={tickFormat}
                            innerHeight={innerHeight}
                        />
                        {
                            yZeroScale.domain().map((month, idx) => {
                                let yScale = scaleBand()
                                    .domain(data.filter(d => d.month === month).map(d => d.type))
                                    .range([0, yZeroScale.bandwidth()])
                                    .padding(0.1);
                                return (
                                    <g key={idx} transform={`translate(0,${yZeroScale(month)})`}>
                                        {
                                            data.filter(d => d.month === month).map((d, idx) => (
                                                <React.Fragment key={idx}>
                                                    <Bars
                                                        xScale={xScale}
                                                        yScale={yScale}
                                                        yValue={d.type}
                                                        xValue={d.value}
                                                        color={color(d.type)}
                                                        getTransition={getTransition}
                                                        budgetService={budgetService}
                                                        currentCurrency={currentCurrency}
                                                    />
                                                </React.Fragment>
                                            ))
                                        }
                                        <ZeroLine height={yZeroScale.bandwidth()}/>
                                        <text
                                            key={idx}
                                            dy={yZeroScale.bandwidth() / 1.6}
                                            transform={`translate(${innerWidth + 15},0)`}
                                            className={'statistic__double-bar-chart--title'}
                                        >
                                            {month}
                                        </text>
                                    </g>
                                );
                            })
                        }
                    </g>
                </svg>
            }
        </div>
    );
};


DoubleBarChart.propTypes = {
    data: PropTypes.array,
    tickFormat: PropTypes.func,
    appService: PropTypes.object,
    getTransition: PropTypes.func,
    budgetService: PropTypes.object,
    currencyStorage: PropTypes.array,
    currentCurrency: PropTypes.object,
    setCurrentCurrency: PropTypes.func
};


export default DoubleBarChart;