import Arc from './Arc';
import React  from 'react';
import {arc, pie} from 'd3-shape';
import PropTypes from 'prop-types';
import Slider from '../../ui/slider/Slider';
import {interpolateRgb} from 'd3-interpolate';


const PieChart = props => {
    const color = interpolateRgb('#64798ACC', '#3D5362CC');
    const dimension = {width: 900, height: 350, radius: 150};
    const center = {x: (dimension.width / 2 + 5), y: (dimension.height / 2 + 5)};
    const {data, barRef, getTransition, budgetService, currentCurrency, currencyStorage, setCurrentCurrency} = props;

    const getPie = pie().sort(null).value(d => d.amount);
    const arcPath = arc().outerRadius(dimension.radius).innerRadius(dimension.radius / 1.5);

    return(
        <div className={'statistic__pie-chart'}>
            <div className={'statistic__pie-chart--select'}>
                <Slider slides={currencyStorage} setCurrentCurrency={setCurrentCurrency}/>
            </div>
            {data.length === 0 ? <div className={'statistic__alarm'}>Нет данных</div> :
                <svg width={dimension.width} height={dimension.height}>
                    <g transform={`translate(${center.x}, ${center.y})`}>
                        {getPie(data).map((d, idx) => (
                            <React.Fragment key={idx}>
                                <Arc
                                    d={d}
                                    idx={idx}
                                    color={color}
                                    barRef={barRef}
                                    arcPath={arcPath}
                                    data={getPie(data)}
                                    getTransition={getTransition}
                                    budgetService={budgetService}
                                    currentCurrency={currentCurrency}
                                />
                            </React.Fragment>
                        ))}
                    </g>
                </svg>
            }
        </div>
    );
};


PieChart.propTypes = {
    data: PropTypes.array,
    barRef: PropTypes.object,
    getTransition: PropTypes.func,
    budgetService: PropTypes.object,
    currencyStorage: PropTypes.array,
    currentCurrency: PropTypes.object,
    setCurrentCurrency: PropTypes.func
};


export default PieChart;