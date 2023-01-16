import {useState, useEffect} from 'react';
import {UseDateInterface} from './hooks.interface';

let interval: ReturnType<typeof setTimeout>;
const useDate = (): UseDateInterface => {
    const [date, setDate] = useState<Date>(new Date());

    useEffect(() => {
        interval = setInterval(() => setDate(new Date()), 1000);
        return () => interval && clearInterval(interval);
    }, [setDate]);

    return {date,};
};

export default useDate;