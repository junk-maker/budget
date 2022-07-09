import {useMemo, useState} from 'react';

const useDatepicker = appService => {
    const [mode, setMode] = useState('days');
    const [between, setBetween] = useState([]);
    const [endDate, setEndDate] = useState(null);
    const [pickYear, setPickYear] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [animation, setAnimation] = useState(null);
    const [selected, setSelected] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(appService.createDate(selected));
    const [selectedYear, setSelectedYear] = useState(selectedDay.year);
    const monthesNames = useMemo(() => appService.getMonthesNames(), [appService]);
    const [selectedYearsInterval, setSelectedYearsInterval] = useState(appService.getYearsInterval(selectedDay.year));
    const [selectedMonth, setSelectedMonth] = useState(appService.createMonth({date: new Date(selectedDay.year, selectedDay.monthIndex)}));

    const getAnimation = direction => {
        if (direction === 'left') {
            setAnimation('outPrev');
            appService.delay(0).then(() => setAnimation('inPrev'));
        } else {
            setAnimation('outNext');
            appService.delay(0).then(() => setAnimation('inNext'));
        };
    };

    return {
        mode,
        setMode,
        between,
        endDate,
        selected,
        pickYear,
        animation,
        startDate,
        setEndDate, 
        setBetween,
        setPickYear,
        selectedDay,
        setSelected,
        setAnimation,
        setStartDate,
        selectedYear,
        monthesNames,
        getAnimation,
        selectedMonth,
        setSelectedDay,
        setSelectedYear,
        setSelectedMonth,
        selectedYearsInterval,
        setSelectedYearsInterval,
    };
};

export default useDatepicker;