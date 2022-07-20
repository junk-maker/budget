import {useState, useEffect} from 'react';

let interval;
const useAuth = (time, type, schema) => {
    const [form, setForm] = useState(schema);
    const [count, setCount] = useState(time);

    useEffect(() => {
        if (type === 'verify-email') {
            if (count === 0) return;
            interval = setInterval(() => setCount(prev => prev - 1), 1000);
            return () => interval && clearInterval(interval);  
        } else {
            if (count === 0) return;
        };  
    },[type, count, setCount]);

    return {form, count, setForm, setCount,};
};

export default useAuth;