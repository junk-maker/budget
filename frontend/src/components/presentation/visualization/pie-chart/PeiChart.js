import Arc from './Arc';
import {arc, pie} from 'd3-shape';
import PropTypes from 'prop-types';
import React, {memo, useMemo} from 'react';
import {interpolateRgb} from 'd3-interpolate';
import BounceLoader from '../../ui/bounce-loader/BounceLoader';

const PieChart = memo(({data, loading, getTransition, markupService, budgetService, currentCurrency}) => {
    const color = useMemo(() => interpolateRgb('#64798ACC', '#3D5362CC'), []);
    const dimension = useMemo(() => {return {width: 900, height: 350, radius: 150}}, []);
    const center = useMemo(() => {return {x: (dimension.width / 2 + 5), y: (dimension.height / 2 + 5)}}, [dimension.width, dimension.height]);

    const getPie = useMemo(() => pie().sort(null).value(d => d.amount), []);
    const arcPath = useMemo(() => arc().outerRadius(dimension.radius).innerRadius(dimension.radius / 1.5), [dimension.radius]);

    return (
        <>
            {
                loading ? <BounceLoader className={'bounce--statistics'}/> : <div className={'pie-chart'}>
                    {data.length === 0 ? <div className={'statistics__value'}>
                        {markupService.chartsHeadingTemplate()['charts']}
                    </div> :
                        <svg width={dimension.width} height={dimension.height}>
                            <g transform={`translate(${center.x}, ${center.y})`}>
                                {getPie(data).map((d, idx) => (
                                    <React.Fragment key={d.data._id}>
                                        <Arc
                                            d={d}
                                            idx={idx}
                                            color={color}
                                            arcPath={arcPath}
                                            data={getPie(data)}
                                            markupService={markupService}
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
            }
        </>
    );
});

PieChart.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
    getTransition: PropTypes.func,
    budgetService: PropTypes.object,
    markupService: PropTypes.object,
    currentCurrency: PropTypes.object,
};

export default PieChart;