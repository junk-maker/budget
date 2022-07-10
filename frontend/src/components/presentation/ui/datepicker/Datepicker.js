import PropTypes from 'prop-types';
import Button from '../button/Button';
import React, {useMemo, useEffect} from 'react';
import useDatepicker from '../../../../hooks/datepicker-hook';

const daysInWeek = 7;
const firstWeekDayNumber = 2;
const Datepicker = props => {
    const {type, dispatch, setPopupOpen,appService, fetchBudget, 
        fetchStatistics, markupService, currentCurrency} = props
    ;
    const {mode, setMode, endDate, between, selected, pickYear, animation, startDate,
        setEndDate, setBetween, setPickYear, setAnimation, setSelected, selectedYear, 
        monthesNames, getAnimation, selectedMonth, setStartDate, setSelectedYear, setSelectedMonth, selectedYearsInterval, setSelectedYearsInterval} = useDatepicker(appService)
    ;
    const days = useMemo(() => selectedMonth.createMonthDays(), [selectedMonth]);    
    const weekDaysNames = useMemo(() => appService.getWeekDaysNames(firstWeekDayNumber), [appService]); 
    const setSelectedMonthByIndex = monthIndex => setSelectedMonth(appService.createMonth({date: new Date(selectedYear, monthIndex)}));
   
    useEffect(() => {
        setBetween(days);
        (type === undefined || type === 'PieChart') ? setMode('days') : setMode('years');
    }, [days, type, setMode, setBetween]);
    
    const calendarDays = useMemo(() => {
        let monthNumberOfDays = appService.getMonthNumberOfDays(selectedMonth.monthIndex, selectedYear);
    
        let prevMonthDays = appService.createMonth({
          date: new Date(selectedYear, selectedMonth.monthIndex - 1),
        }).createMonthDays();
        
        let nextMonthDays = appService.createMonth({
          date: new Date(selectedYear, selectedMonth.monthIndex + 1),
        }).createMonthDays();

        let result = [];
        let firstDay = days[0];
        let lastDay = days[monthNumberOfDays - 1];
    
        let shiftIndex = firstWeekDayNumber - 1;
        let numberOfPrevDays =
          firstDay.dayNumberInWeek - 1 - shiftIndex < 0
            ? daysInWeek - (firstWeekDayNumber - firstDay.dayNumberInWeek)
            : firstDay.dayNumberInWeek - 1 - shiftIndex
        ;
    
        let numberOfNextDays = daysInWeek - lastDay.dayNumberInWeek + shiftIndex >= 6 
            ? appService.leapYear(selectedYear) === false && monthesNames[selectedMonth.monthIndex].month === appService.checkLeapYearMonth() 
            ? daysInWeek + (daysInWeek - lastDay.dayNumberInWeek + shiftIndex) : daysInWeek - lastDay.dayNumberInWeek + shiftIndex
            : (daysInWeek - lastDay.dayNumberInWeek + shiftIndex + (daysInWeek - lastDay.dayNumberInWeek + shiftIndex >= 5 ? (numberOfPrevDays === 0 ? daysInWeek 
            : (numberOfPrevDays === 6 ? null : daysInWeek)) : daysInWeek))
        ;

        let totalCalendarDays = days.length + numberOfPrevDays + numberOfNextDays;
    
        for (let i = 0; i < numberOfPrevDays; i += 1) {
          const inverted = numberOfPrevDays - i;
          result[i] = prevMonthDays[prevMonthDays.length - inverted];
        };
    
        for (let i = numberOfPrevDays; i < totalCalendarDays - numberOfNextDays; i += 1) {
          result[i] = days[i - numberOfPrevDays];
        };
    
        for (let i = totalCalendarDays - numberOfNextDays; i < totalCalendarDays; i += 1) {
          result[i] = nextMonthDays[i - totalCalendarDays + numberOfNextDays];
        };
        
        return result;
    }, [days, appService, monthesNames, selectedYear, selectedMonth.monthIndex]);
   
    const arrowHandler = direction => {
        if (mode === 'years' && direction === 'left') {
            getAnimation(direction);
            return setSelectedYearsInterval(appService.getYearsInterval(selectedYearsInterval[0] - 10));
        };
    
        if (mode === 'years' && direction === 'right') {
            getAnimation(direction);
            return setSelectedYearsInterval(appService.getYearsInterval(selectedYearsInterval[0] + 10));
        };
    
        if (mode === 'monthes' && direction === 'left') {
            getAnimation(direction);
            let year = selectedYear - 1;
            if (!selectedYearsInterval.includes(year)) setSelectedYearsInterval(appService.getYearsInterval(year));
            return setSelectedYear(selectedYear - 1);
        };
    
        if (mode === 'monthes' && direction === 'right') {
            getAnimation(direction);
            let year = selectedYear + 1;
            if (!selectedYearsInterval.includes(year)) setSelectedYearsInterval(appService.getYearsInterval(year));
            return setSelectedYear(selectedYear + 1);
        };
    
        if (mode === 'days') {
            getAnimation(direction);
            let monthIndex = direction === 'left' ? selectedMonth.monthIndex - 1 : selectedMonth.monthIndex + 1;
            if (monthIndex === -1) {
                const year = selectedYear - 1;
                setSelectedYear(year);
                if (!selectedYearsInterval.includes(year)) setSelectedYearsInterval(appService.getYearsInterval(year));
                return setSelectedMonth(appService.createMonth({date: new Date(selectedYear - 1, 11)}));
            };
    
            if (monthIndex === 12) {
                let year = selectedYear + 1;
                setSelectedYear(year);
                if (!selectedYearsInterval.includes(year)) setSelectedYearsInterval(appService.getYearsInterval(year));
                return setSelectedMonth(appService.createMonth({date: new Date(year, 0)}));
            };
    
            setSelectedMonth(appService.createMonth({date: new Date(selectedYear, monthIndex)}));
        };
    };
    
    return (
        <div className={'datepicker'}>
            <div className={'datepicker__date'}>
                {
                    startDate === null
                        ?  appService.date(selected).slice(appService.date(selected).split(' ')[0].length) 
                        :  (!!startDate && endDate === null) || (!!endDate && startDate?.dayNumber === endDate?.dayNumber)
                        ?  appService.date(startDate?.date).slice(appService.date(startDate?.date).split(' ')[0].length)
                        : `${appService.date(startDate?.date).slice(appService.date(startDate?.date).split(' ')[0].length)} | ${appService.date(endDate?.date).slice(appService.date(endDate?.date).split(' ')[0].length)}`
                }
            </div>

            <div className={'datepicker__container'}>
                <div className={'datepicker__header'}>
                    <div className={'datepicker__heading'}>
                        {mode === 'days' && (
                        <div aria-hidden onClick={() => {
                            setMode('monthes');
                            setAnimation('new');
                        }}>
                            {monthesNames[selectedMonth.monthIndex].month} {selectedYear}
                        </div>
                        )}
                        {mode === 'monthes' && (
                        <div aria-hidden onClick={() => { 
                            setMode('years');
                            setAnimation('new');
                        }}>
                            {selectedYear}
                        </div>
                        )}
                        {mode === 'years' && (
                        <div>
                            {selectedYearsInterval[0]} -{' '}
                            {selectedYearsInterval[selectedYearsInterval.length - 1]}
                        </div>
                        )}
                    </div>
                    <div className='datepicker__arrow-container'>
                        <img
                            aria-hidden
                            className={'datepicker__arrow-left'}
                            onClick={() => arrowHandler('left')}
                            alt={markupService.svgHeadingTemplate()['left']}
                            src={markupService.datepickerHeadingTemplate()['arrow']}
                        />
                        <img
                            aria-hidden
                            className={'datepicker__arrow-right'}
                            onClick={() => arrowHandler('right')}
                            alt={markupService.svgHeadingTemplate()['right']}
                            src={markupService.datepickerHeadingTemplate()['arrow']}
                        />
                    </div>
                </div>

                <div className={'datepicker__body'}>
                    {mode === 'days' && (
                        <>
                            <div className={'datepicker__week'}>
                                {weekDaysNames.map((weekDaysName) => (
                                    <div key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
                                ))}
                            </div>
                            <div className={!!animation ? `datepicker__days ${animation}` : 'datepicker__days start'}>
                                {calendarDays.map(day => {
                                    let end = !!endDate ? endDate : '';
                                    let start = !!startDate ? startDate : '';
                                    let isToday = appService.checkIsToday(day.date);
                                    let isAdditionalDay = day.monthIndex !== selectedMonth.monthIndex;
                                    let selectedEndDay = !!endDate ? appService.checkDateIsEqual(day.date, endDate.date) : null;
                                    let selectedStartDay = !!startDate ? appService.checkDateIsEqual(day.date, startDate.date) : null;
                                    
                                    let setRange = () => {
                                        if ((startDate != null && endDate !== null)) {
                                            setEndDate(null);
                                            setStartDate(day);
                                        } else {
                                            (day.dayNumber < startDate?.dayNumber && day.monthIndex === startDate?.monthIndex && day.year === startDate?.year) || (day.monthIndex < startDate?.monthIndex && day.year === startDate?.year) || day.year < startDate?.year
                                            ? setStartDate(day)
                                            : startDate === null ? setStartDate(day) : setEndDate(day);
                                        };
                                    };
                                 
                                    return (
                                        <div
                                            aria-hidden
                                            onClick={!isAdditionalDay ? () => {
                                                setRange();
                                                setSelected(day.date);
                                            } : null}
                                            key={`${day.dayNumber}-${day.monthIndex}`}
                                            className={[
                                                'datepicker__day',
                                                isToday ? 'datepicker__today' : '',
                                                isAdditionalDay ? 'datepicker__additional' : '',
                                                appService.isBetween(day, end, start, between) ? 'datepicker__between' : '',
                                                selectedEndDay && startDate?.dayNumber !== endDate?.dayNumber  ? 'datepicker__end' : '',
                                                selectedStartDay ? endDate && startDate?.dayNumber !== endDate?.dayNumber ? 'datepicker__start' : 'datepicker__active' : ''].join(' ')
                                            }
                                        >{day.dayNumber}</div>
                                    );
                                })}
                            </div>
                        </>
                    )}

                    {mode === 'monthes' && (
                        <div className={`datepicker__pick-items ${animation}`}>
                            {monthesNames.map(monthesName => {
                                let isCurrentMonth = new Date().getMonth() === monthesName.monthIndex && selectedYear === new Date().getFullYear();
                                
                                return (
                                    <div
                                        aria-hidden
                                        key={monthesName.month}
                                        onClick={() => {
                                            setMode('days');
                                            setSelectedMonthByIndex(monthesName.monthIndex);
                                        }}
                                        className={isCurrentMonth ? 'datepicker__pick-item datepicker__today' :  'datepicker__pick-item'}
                                    >
                                        {monthesName.monthShort.slice(0, 3)}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {mode === 'years' && (
                        <div className={!!animation ? `datepicker__pick-items ${animation}` : 'datepicker__pick-items start'}>
                            <div className={'datepicker__unchoosable'}>{selectedYearsInterval[0] - 1}</div>
                            {selectedYearsInterval.map(year => {
                                let isCurrentYear = new Date().getFullYear() === year;
                                
                                return (
                                        <div
                                            key={year}
                                            aria-hidden
                                            onClick={() => {
                                                setPickYear(year);
                                                setSelectedYear(year);
                                                setMode((type === undefined || type === 'PieChart') ? 'monthes' : 'years');
                                            }}
                                            className={[
                                                isCurrentYear ? 'datepicker__pick-item datepicker__today' : 'datepicker__pick-item',
                                                (type !== undefined && type !== 'PieChart') ? pickYear === year ? 'datepicker__pick-item datepicker__selected' : 'datepicker__pick-item' : null,].join(' ')
                                            }
                                        >
                                            {year}
                                        </div>
                                    );
                                })
                            }
                            <div className={'datepicker__unchoosable'}>
                                {selectedYearsInterval[selectedYearsInterval.length - 1] + 1}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className={'datepicker__btn-container'}>
                <Button 
                    className={'btn btn__datepicker'}
                    onClick={() => {
                        let year = type !== undefined && type === 'PieChart' 
                            ? selectedMonth.year 
                            : pickYear === null ? selectedMonth.year : pickYear
                        ;
                        setPopupOpen('out');
                        dispatch(type === undefined 
                            ? fetchBudget(endDate?.date, startDate?.date, selectedMonth.year, selectedMonth.monthIndex, currentCurrency)
                            : fetchStatistics(endDate?.date, startDate?.date, year, type, selectedMonth.monthIndex, currentCurrency)
                        );
                    }}
                >
                    <span>{markupService.datepickerHeadingTemplate()['select']}</span>
                </Button>
            </div>
        </div>
    );
};


Datepicker.propTypes = {
    type: PropTypes.string,
    dispatch: PropTypes.func,
    fetchBudget: PropTypes.func,  
    appService: PropTypes.object, 
    fetchStatistics: PropTypes.func, 
    markupService: PropTypes.object,
    currentCurrency: PropTypes.object, 
    setDatepickerOpen: PropTypes.func,
};


export default Datepicker;