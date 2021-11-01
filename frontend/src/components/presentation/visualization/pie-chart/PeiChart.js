import Arc from './Arc';
import {arc, pie} from 'd3-shape';
import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import Slider from '../../ui/slider/Slider';
import {interpolateRgb} from 'd3-interpolate';


const PieChart = props => {
    const color = interpolateRgb('#64798ACC', '#3D5362CC');
    const dimension = {width: 900, height: 350, radius: 150};
    const center = {x: (dimension.width / 2 + 5), y: (dimension.height / 2 + 5)};
    const {data, barRef, monthId, setMonthId, appService, monthStorage,
        getTransition, budgetService, currentCurrency, currencyStorage, setCurrentCurrency} = props;

    useEffect(() => {
        setCurrentCurrency(currencyStorage[0]);
    }, [currencyStorage, setCurrentCurrency]);

    const getPie = pie().sort(null).value(d => d.amount);
    const arcPath = arc().outerRadius(dimension.radius).innerRadius(dimension.radius / 1.5);

    return(
        <div className={'statistic__pie-chart'}>
            <div className={'statistic__pie-chart--months'}>
                <Slider
                    name={'month'}
                    monthId={monthId}
                    slides={monthStorage}
                    appService={appService}
                    setMonthId={setMonthId}
                />
            </div>

            <div className={'statistic__pie-chart--currency'}>
                <Slider
                    name={'currency'}
                    appService={appService}
                    slides={currencyStorage}
                    setCurrentCurrency={setCurrentCurrency}
                />
            </div>
            {data.length === 0 ? <div className={'statistic__alarm'}>
                    {appService.checkLanguage() ? 'Нет данных' : 'There is no data'}
            </div> :
                <svg width={dimension.width} height={dimension.height}>
                    <g transform={`translate(${center.x}, ${center.y})`}>
                        {getPie(data).map((d, idx) => (
                            <React.Fragment key={d.data._id}>
                                <Arc
                                    d={d}
                                    idx={idx}
                                    color={color}
                                    barRef={barRef}
                                    arcPath={arcPath}
                                    data={getPie(data)}
                                    appService={appService}
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
    monthId: PropTypes.number,
    setMonthId: PropTypes.func,
    language: PropTypes.string,
    appService: PropTypes.object,
    getTransition: PropTypes.func,
    monthStorage: PropTypes.array,
    budgetService: PropTypes.object,
    currencyStorage: PropTypes.array,
    currentCurrency: PropTypes.object,
    setCurrentCurrency: PropTypes.func
};


export default PieChart;