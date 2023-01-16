import {useMemo, useState} from 'react';
import {UseDatepickerInterface} from './hooks.interface';
import AppService from '../services/appService/appService';
import {CreateDateInterface, CreateMonthInterface} from '../services/appService/app.service.interface';

const useDatepicker = (appService: AppService): UseDatepickerInterface => {
    const [mode, setMode] = useState<string>('days');
    const [between, setBetween] = useState<Array<any>>([]);
    const [endDate, setEndDate] = useState<null>(null);
    const [pickYear, setPickYear] = useState<null>(null);
    const [startDate, setStartDate] = useState<null>(null);
    const [animation, setAnimation] = useState<string>('');
    const [selected, setSelected] = useState<Date>(new Date());
    const monthesNames = useMemo(() => appService.getMonthesNames(), [appService]);
    const [selectedDay, setSelectedDay] = useState<CreateDateInterface>(appService.createDate({date: selected}));
    const [selectedYear, setSelectedYear] = useState<number>(selectedDay.year);
    const [selectedYearsInterval, setSelectedYearsInterval] = useState<number[]>(appService.getYearsInterval(selectedDay.year));
    const [selectedMonth, setSelectedMonth] = useState<CreateMonthInterface>(appService.createMonth({date: new Date(selectedDay.year, selectedDay.monthIndex)}));

    const getAnimation = (direction: string): void => {
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