import PropTypes from 'prop-types';
import Button from '../button/Button';
import useDatepicker from '../../../../hooks/datepicker-hook';
import React, {useMemo, useEffect, useLayoutEffect} from 'react';

const daysInWeek = 7;
const firstWeekDayNumber = 2;
const Datepicker = props => {
    const {appService, markupService} = props;
    const {mode, setMode, endDate, between, selected, animation, startDate,
        setEndDate, setBetween, setAnimation, setSelected, selectedYear, monthesNames,
        getAnimation, selectedMonth, setStartDate, setSelectedYear, setSelectedMonth, 
        selectedYearsInterval, setSelectedYearsInterval,} = useDatepicker(appService)
    ;
    
    useLayoutEffect(() => setAnimation('new'), [mode, setAnimation]);
    const days = useMemo(() => selectedMonth.createMonthDays(), [selectedMonth]);    
    const weekDaysNames = useMemo(() => appService.getWeekDaysNames(firstWeekDayNumber), [appService]); 
    const setSelectedMonthByIndex = monthIndex => setSelectedMonth(appService.createMonth({date: new Date(selectedYear, monthIndex)}));
   
    useEffect(() => setBetween(days), [days, setBetween]);
  
    const calendarDays = useMemo(() => {
        const monthNumberOfDays = appService.getMonthNumberOfDays(selectedMonth.monthIndex, selectedYear);
    
        const prevMonthDays = appService.createMonth({
          date: new Date(selectedYear, selectedMonth.monthIndex - 1),
        }).createMonthDays();
        
        const nextMonthDays = appService.createMonth({
          date: new Date(selectedYear, selectedMonth.monthIndex + 1),
        }).createMonthDays();

        const result = [];
        const firstDay = days[0];
        const lastDay = days[monthNumberOfDays - 1];
    
        const shiftIndex = firstWeekDayNumber - 1;
        const numberOfPrevDays =
          firstDay.dayNumberInWeek - 1 - shiftIndex < 0
            ? daysInWeek - (firstWeekDayNumber - firstDay.dayNumberInWeek)
            : firstDay.dayNumberInWeek - 1 - shiftIndex
        ;

        const numberOfNextDays = daysInWeek - lastDay.dayNumberInWeek + shiftIndex >= 6 
            ? appService.leapYear(selectedYear) === false && monthesNames[selectedMonth.monthIndex].month === appService.checkLeapYearMonth() 
            ? daysInWeek + (daysInWeek - lastDay.dayNumberInWeek + shiftIndex) : daysInWeek - lastDay.dayNumberInWeek + shiftIndex
            : (daysInWeek - lastDay.dayNumberInWeek + shiftIndex + (daysInWeek - lastDay.dayNumberInWeek + shiftIndex >= 5 ? (numberOfPrevDays === 0 ? daysInWeek 
            : (numberOfPrevDays === 6 ? null : daysInWeek)) : daysInWeek))
        ;

        const totalCalendarDays = days.length + numberOfPrevDays + numberOfNextDays;
    
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
            const year = selectedYear - 1;
            if (!selectedYearsInterval.includes(year)) setSelectedYearsInterval(appService.getYearsInterval(year));
            return setSelectedYear(selectedYear - 1);
        };
    
        if (mode === 'monthes' && direction === 'right') {
            getAnimation(direction);
            const year = selectedYear + 1;
            if (!selectedYearsInterval.includes(year)) setSelectedYearsInterval(appService.getYearsInterval(year));
            return setSelectedYear(selectedYear + 1);
        };
    
        if (mode === 'days') {
            getAnimation(direction);
            const monthIndex = direction === 'left' ? selectedMonth.monthIndex - 1 : selectedMonth.monthIndex + 1;
            if (monthIndex === -1) {
                const year = selectedYear - 1;
                setSelectedYear(year);
                if (!selectedYearsInterval.includes(year)) setSelectedYearsInterval(appService.getYearsInterval(year));
                return setSelectedMonth(appService.createMonth({date: new Date(selectedYear - 1, 11)}));
            };
    
            if (monthIndex === 12) {
                const year = selectedYear + 1;
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
                        <div aria-hidden onClick={() => setMode('monthes')}>
                            {monthesNames[selectedMonth.monthIndex].month} {selectedYear}
                        </div>
                        )}
                        {mode === 'monthes' && (
                        <div aria-hidden onClick={() => setMode('years')}>
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
                            src={markupService.datepickerHeadingTemplate()['icon']}
                            alt={markupService.datepickerHeadingTemplate()['left']}
                        />
                        <img
                            aria-hidden
                            className={'datepicker__arrow-right'}
                            onClick={() => arrowHandler('right')}
                            src={markupService.datepickerHeadingTemplate()['icon']}
                            alt={markupService.datepickerHeadingTemplate()['right']}
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
                            <div className={`datepicker__days ${animation}`}>
                                {calendarDays.map(day => {
                                    const end = !!endDate ? endDate : '';
                                    const start = !!startDate ? startDate : '';
                                    const isToday = appService.checkIsToday(day.date);
                                    const isAdditionalDay = day.monthIndex !== selectedMonth.monthIndex;
                                    const selectedEndDay = !!endDate ? appService.checkDateIsEqual(day.date, endDate.date) : null;
                                    const selectedStartDay = !!startDate ? appService.checkDateIsEqual(day.date, startDate.date) : null;
                                    
                                    const setRange = () => {
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
                                const isCurrentMonth = new Date().getMonth() === monthesName.monthIndex && selectedYear === new Date().getFullYear();
                                    
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
                        <div className={`datepicker__pick-items ${animation}`}>
                            <div className={'datepicker__unchoosable'}>{selectedYearsInterval[0] - 1}</div>
                            {selectedYearsInterval.map(year => {
                                const isCurrentYear = new Date().getFullYear() === year;
                                
                                return (
                                        <div
                                            key={year}
                                            aria-hidden
                                            onClick={() => {
                                                setMode('monthes');
                                                setSelectedYear(year);
                                            }}
                                            className={isCurrentYear ? 'datepicker__pick-item datepicker__today' : 'datepicker__pick-item'}
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
                <Button className='btn btn__datepicker'>
                    <span>{markupService.datepickerHeadingTemplate()['select']}</span>
                </Button>
            </div>
        </div>
    );
};


Datepicker.propTypes = {
    appService: PropTypes.object, 
    markupService: PropTypes.object,
};


export default Datepicker;