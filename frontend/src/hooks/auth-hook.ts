import {useState, useEffect} from 'react';
import {UseAuthInterface} from './hooks.interface';
import {SchemaInterface} from '../services/appService/app.service.interface';

let interval: ReturnType<typeof setTimeout>;
const useAuth = (time: number, type: string, schema: SchemaInterface): UseAuthInterface => {
    const [count, setCount] = useState<number>(time);
    const [form, setForm] = useState<SchemaInterface>(schema);

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