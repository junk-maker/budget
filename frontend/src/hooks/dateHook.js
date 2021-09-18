import {useState} from 'react';

const useDate= () => {
    const [date, setDate] = useState(new Date());

    return {
        date,
        timer: () => setDate(new Date()),
    }
};

export default useDate;