import {useState, useEffect} from 'react';

let timeout;
const useDatepicker = () => {
    const [datepicker, setDatepicker] = useState(null);

    useEffect(() => {
        timeout && clearTimeout(timeout);
        timeout = setTimeout(() => setDatepicker('in'), 0);
    },[]);

    useEffect(() => {
        return () => {timeout && clearTimeout(timeout);};
    }, []);

    return {datepicker, setDatepicker};
};

export default useDatepicker;