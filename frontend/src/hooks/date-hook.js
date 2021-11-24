import {useState, useEffect} from 'react';

let interval;
const useDate= () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        interval = setInterval(() => setDate(new Date()), 1000);
        return () => interval && clearInterval(interval);
    }, [setDate]);

    return {date};
};

export default useDate;