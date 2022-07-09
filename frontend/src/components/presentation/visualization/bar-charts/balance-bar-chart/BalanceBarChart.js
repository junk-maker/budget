import Bars from '../Bars';
import {max} from 'd3-array';
import AxisLeft from './AxisLeft';
import ZeroLine from '../ZeroLine';
import PropTypes from 'prop-types';
import React from 'react';
import AxisBottom from './AxisBottom';
import {scaleBand, scaleLinear} from 'd3-scale';
import BounceLoader from '../../../ui/bounce-loader/BounceLoader';



const BalanceBarChart = props => {
    const dimension = {width: 960, height: 500};
    const margin = {top: 20, right: 30, bottom: 65, left: 220};
    const innerWidth = dimension.width - margin.left - margin.right;
    const innerHeight = dimension.height - margin.top - margin.bottom;
    const {data, loading, tickFormat, getTransition, markupService, budgetService, currentCurrency} = props;
    
    const yScale = scaleBand()
        .domain(data.map(d => d.month))
        .range([0, innerHeight])
        .paddingInner(0.15)
    ;

    const xScale = scaleLinear()
        .domain([0, max(data, d => d.value < 0 ? Math.abs(d.value) : d.value)])
        .range([0, innerWidth])
    ;

    return (
        <>
            {
                loading ? <BounceLoader className={'bounce--statistics'}/> : <div className={'balance-bar-chart'}>
                    {data.every(val => val.value === 0) ? <div className={'statistic__value'}>
                        {markupService.chartsHeadingTemplate()['charts']}
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
                                                getTransition={getTransition}
                                                budgetService={budgetService}
                                                currentCurrency={currentCurrency}
                                                fill={d.value < 0 ? '#FF5049' : '#203d4a'}
                                            />
                                        </React.Fragment>
                                    ))
                                }
                            </g>
                        </svg>
                    }
                </div>
            }
        </>
    );
};


BalanceBarChart.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
    tickFormat: PropTypes.func,
    getTransition: PropTypes.func,
    budgetService: PropTypes.object,
    markupService: PropTypes.object,
    currentCurrency: PropTypes.object,
};


export default BalanceBarChart;