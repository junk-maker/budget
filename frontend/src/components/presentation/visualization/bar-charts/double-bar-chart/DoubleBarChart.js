import React from 'react';
import Bars from '../Bars';
import {max} from 'd3-array';
import PropTypes from 'prop-types';
import ZeroLine from '../ZeroLine';
import AxisBottom from './AxisBottom';
import ColorLegend from './ColorLegend';
import {scaleBand, scaleLinear, scaleOrdinal} from 'd3-scale';
import BounceLoader from '../../../ui/bounce-loader/BounceLoader';


const DoubleBarChart = props => {
    const dimension = {width: 960, height: 500};
    const margin = {top: 20, right: 170, bottom: 40, left: 200};
    const innerWidth = dimension.width - margin.right - margin.left;
    const innerHeight = dimension.height - margin.top - margin.bottom;
    const {data, loading, tickFormat, getTransition, markupService, budgetService, currentCurrency} = props;

    const color = scaleOrdinal().domain(data.map(d => d.type)).range(['#203d4a', '#FF5049']);
    
    const yZeroScale = scaleBand()
        .domain(data.map(d => d.month))
        .range([0, innerHeight])
        .paddingInner(0.1)
        .paddingOuter(0)
    ;
    
    const xScale = scaleLinear()
        .domain([0, max(data, d => d.value)])
        .range([0, innerWidth])
    ;

    const colorScale = scaleBand()
        .domain(data.map(d => d.type))
    ;

    return (
        <>
            {
                loading ? <BounceLoader className={'bounce--statistics'}/> : <div className={'double-bar-chart'}>
                    {data.every(val => val.value === 0) ? <div className={'statistics__value'}>
                        {markupService.chartsHeadingTemplate()['charts']}
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
                                                    className={'double-bar-chart__title'}
                                                    transform={`translate(${innerWidth + 15},0)`}
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
            }
        </>
    );
};


DoubleBarChart.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
    tickFormat: PropTypes.func,
    getTransition: PropTypes.func,
    budgetService: PropTypes.object,
    markupService: PropTypes.object,
    currentCurrency: PropTypes.object,
};


export default DoubleBarChart;