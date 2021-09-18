import {useState} from 'react';

const useAuth = (time, schema) => {
    const [form, setForm] = useState(schema);
    const [count, setCount] = useState(time);

    return {
        form,
        count,
        setForm,
        timer: () => setCount(prev => prev - 1)
    }
};

export default useAuth;