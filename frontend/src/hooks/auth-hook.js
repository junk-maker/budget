import {useState, useEffect} from 'react';

let interval;
const useAuth = (time, schema) => {
    const [form, setForm] = useState(schema);
    const [count, setCount] = useState(time);

    useEffect(() => {
        // console.clear();
        if (count === 0) return;
        interval = setInterval(() => setCount(prev => prev - 1), 1000);
        return () => interval && clearInterval(interval);
    },[count, setCount]);

    return {form, count, setForm, setCount,};
};

export default useAuth;